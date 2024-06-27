<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="showModal" max-width="600">
      <v-card :title="`${formAction} Pedido`">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="model.client_id"
                :items="clientStore.allClients"
                label="Cliente*"
                item-title="name"
                item-value="id"
              ></v-select>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-date-input label="Data" v-model="model.date" prepend-icon=""></v-date-input>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-card variant="text" v-if="products.length">
                <v-card-title>Produtos</v-card-title>

                <section class="overflow-y-auto" :style="{ maxHeight: '300px' }">
                  <v-row dense v-for="(product, index) in products">
                    <v-col cols="6" md="6" sm="6">
                      <v-select
                        v-model="product.product"
                        :items="avaliblesProducts"
                        return-object
                        item-title="name"
                        label="Produto"
                      />
                    </v-col>

                    <v-col cols="6" md="6" sm="6">
                      <section class="d-flex">
                        <v-number-input
                          control-variant="split"
                          label="Quantidade *"
                          :step="1"
                          :min="0"
                          v-model="product.quantity"
                        />

                        <v-btn
                          density="default"
                          variant="text"
                          size="medium"
                          icon="mdi-trash-can-outline"
                          class="align-self-baseline justify-center ml-2 mt-5"
                          @click="removeProduct(index)"
                        ></v-btn>
                      </section>
                    </v-col>
                  </v-row>
                </section>
              </v-card>

              <v-btn
                v-if="avaliblesProducts.length"
                class="mt-1"
                text="Novo Produto"
                color="primary"
                variant="tonal"
                @click="addProduct"
                :disabled="props.loading"
              />
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">* Indica campo obrigatorio</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancelar"
            variant="plain"
            @click="emit('hidden')"
            :disabled="props.loading"
          />

          <v-btn
            color="primary"
            :text="props.loading ? 'Carregando...' : 'Salvar'"
            variant="tonal"
            @click="submit"
            :disabled="props.loading"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { clone } from 'radash'
import { orderModel } from '@/models/orders'
import { useDate } from 'vuetify'
import { useClientStore, useProductStore } from '@/stores'

const props = defineProps(['loading'])

const emit = defineEmits<{
  submit: [data: any]
  hidden: []
}>()

const date = useDate()
const productStore = useProductStore()
const clientStore = useClientStore()

const model = ref(clone(orderModel))
const showModal = ref(false)
const formAction = ref('Criar')
const products = ref<any[]>([])

const avaliblesProducts = computed(() => {
  const selectedProducts = products.value.reduce((acc, product) => {
    if (!product.product?.id) return acc

    if (acc[product.product?.id]) return acc

    acc[product.product?.id] = product.product?.id
    return acc
  }, {})

  return productStore.allProducts.filter((product) => !selectedProducts[product.id])
})

async function loadData() {
  await Promise.allSettled([productStore.getAllProducts(), clientStore.getAllClients()])
}

async function show(data: any) {
  formAction.value = data?.id ? 'Editar' : 'Criar'

  await loadData()

  if (data?.id) {
    model.value = { ...model.value, ...data, date: date.date(data.date) }

    products.value = data?.products.map((product: any) => {
      const productOrderRelation = data.orderProducts.find(
        (productOrder: any) => productOrder.product_id === product.id
      )

      return { product, quantity: productOrderRelation.quantity, price: productOrderRelation.price }
    })
  }

  showModal.value = true
}

function hide() {
  showModal.value = false
  formAction.value = 'Criar'
  model.value = clone(orderModel)
}

function submit() {
  emit('submit', {
    ...model.value,
    products: products.value.map((product) => ({
      product_id: product.product.id,
      quantity: product.quantity,
      price: (product.quantity * product.product.price).toFixed(2)
    })),
    date: date.toISO(model.value.date)
  })
}

function addProduct() {
  products.value.push({ product: null, quantity: 0 })
}

function removeProduct(index: number) {
  products.value.splice(index, 1)
}

defineExpose({ show, hide })
</script>

<style scoped></style>
