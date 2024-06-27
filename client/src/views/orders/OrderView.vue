<template>
  <section>
    <v-breadcrumbs :items="breadcrumLinks"></v-breadcrumbs>

    <v-card class="px-4 py-3">
      <v-card-title>
        <h1 class="text-h4 font-weight-thin text-center">Pedido #{{ order.id ?? '' }}</h1>
      </v-card-title>

      <v-divider></v-divider>

      <section>
        <section>
          <v-row dense>
            <v-col cols="6" md="3" sm="6">
              <section class="d-flex flex-column mt-4">
                <label for="client-name" class="font-weight-thin text-h6 text-center">
                  Cliente
                </label>

                <p id="client-name" class="text-subtitle-1 text-center">
                  {{ order?.client?.name ?? '' }}
                </p>
              </section>
            </v-col>

            <v-col cols="6" md="3" sm="6">
              <section class="d-flex flex-column mt-4">
                <label for="client-name" class="text-h6 text-center font-weight-thin">
                  Quantidade de produtos
                </label>

                <p id="client-name" class="text-subtitle-1 text-center">{{ productsQuantity }}</p>
              </section>
            </v-col>

            <v-col cols="6" md="3" sm="6">
              <section class="d-flex flex-column mt-4">
                <label for="client-name" class="font-weight-thin text-h6 text-center">
                  Valor total
                </label>

                <p id="client-name" class="text-subtitle-1 text-center">
                  {{ formatCurrency(totalOrderValue) }}
                </p>
              </section>
            </v-col>

            <v-col cols="6" md="3" sm="6">
              <section class="d-flex flex-column mt-4">
                <label for="client-name" class="font-weight-thin text-h6 text-center"> Data </label>

                <p id="client-name" class="text-subtitle-1 text-center">
                  {{ date.format(order.date, 'keyboardDate') }}
                </p>
              </section>
            </v-col>
          </v-row>
        </section>
      </section>
    </v-card>

    <v-card variant="elevated" class="px-4 py-3 mt-4">
      <v-card-title class="text-center">
        <h1 class="text-h4 font-weight-thin text-center">Produtos</h1>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-data-table
          :items="orderProducts"
          :headers="orderViewProductsColuns"
          :search="search"
          :custom-filter="filterByProduct"
        >
          <template v-slot:top>
            <v-row>
              <v-col cols="9" md="9" sm="9" />
              <v-col cols="3" md="3" sm="6">
                <v-select
                  :clearable="true"
                  density="compact"
                  variant="solo-filled"
                  v-model="search"
                  label="Selecionar por produto..."
                  :items="orderProducts"
                  item-title="name"
                  item-value="name"
                />
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.price="{ item }: { item: any }">
            {{ formatCurrency(item.price) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { useCurrency } from '@/composables'
import { orderViewProductsColuns } from '@/models/orders'
import { useOrderStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useDate } from 'vuetify'

const props = defineProps(['id'])

const orderStore = useOrderStore()
const date = useDate()
const { formatCurrency } = useCurrency()

const { order } = storeToRefs(orderStore)
const breadcrumLinks = ref([
  {
    title: 'Pedidos',
    disabled: false,
    href: '/orders'
  }
])
const search = ref('')

const productsById = computed(() => {
  return order.value?.products?.reduce((acc: any, product: any) => {
    acc[product.id] = product
    return acc
  }, {})
})

const orderProducts = computed(() => {
  if (!order.value?.orderProducts?.length) return []

  return order.value?.orderProducts?.map((orderProduct: any) => ({
    name: productsById.value[orderProduct.product_id]?.name ?? '',
    price: productsById.value[orderProduct.product_id]?.price ?? '',
    quantity: orderProduct?.quantity ?? ''
  }))
})

const productsQuantity = computed(() => {
  return order.value?.orderProducts?.reduce(
    (acc: any, product: any) => (acc += product.quantity),
    0
  )
})

const totalOrderValue = computed(() => {
  return order.value?.orderProducts?.reduce((acc: any, product: any) => (acc += product.price), 0)
})

function filterByProduct(value: any, query: any, _item: any) {
  if (!query) return value
  return value === query
}

onMounted(async () => {
  await Promise.all([orderStore.getById(props.id)])

  breadcrumLinks.value.push({
    title: `Pedido #${order.value?.id ?? ''}`,
    disabled: true,
    href: `/orders/${order.value?.id ?? ''}`
  })
})
</script>

<style scoped></style>
