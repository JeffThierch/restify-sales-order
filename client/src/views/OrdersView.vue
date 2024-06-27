<template>
  <section>
    <PageHeader
      title="Pedidos"
      subtitle="Area de gerenciamento e visualização de pedidos de compra e venda"
    >
      <v-btn size="small" prepend-icon="mdi-plus" color="blue-darken-2" @click="showModal">
        Novo Pedido
      </v-btn>
    </PageHeader>

    <v-card class="my-4">
      <v-data-table
        :items="allOrders"
        :headers="orderColumns"
        :search="search"
        :custom-filter="filterByClient"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="6" md="6" sm="6" />
            <v-col cols="6" md="6" sm="6">
              <v-select
                :clearable="true"
                density="compact"
                variant="solo-filled"
                v-model="search"
                label="Selecionar por cliente..."
                :items="clientStore.allClients"
                item-title="name"
                item-value="name"
              />
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.client.name="{ item }">
          <v-btn :to="`/orders/${item.id}`" variant="plain" flat>
            {{ item.client.name }}
          </v-btn>
        </template>

        <template v-slot:item.date="{ item }">
          {{ date.format(item.date, 'keyboardDate') }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="showModal(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="deleteProduct(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <OrderForm ref="orderFormRef" @hidden="closeModal" @submit="save" :loading="loading" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { orderColumns } from '@/models/orders'
import { useClientStore, useOrderStore } from '@/stores'
import { storeToRefs } from 'pinia'

import PageHeader from '@/components/pages/PageHeader.vue'
import OrderForm from '@/components/forms/OrderForm.vue'
import { useDate } from 'vuetify'

const orderStore = useOrderStore()
const clientStore = useClientStore()
const date = useDate()

const { allOrders } = storeToRefs(orderStore)

const orderFormRef = ref<typeof OrderForm | null>(null)
const loading = ref(false)
const search = ref('')

function showModal(data: any) {
  orderFormRef?.value?.show(data)
}

function closeModal() {
  orderFormRef?.value?.hide()
}

async function save(data: any) {
  try {
    loading.value = true

    data?.id ? await orderStore.updateOrder(data) : await orderStore.saveOrder(data)

    closeModal()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function deleteProduct(data: any) {
  await orderStore.deleteOrder(data.id)
}

function filterByClient(value: any, query: any, _item: any) {
  if (!query) return value
  return value === query
}

onMounted(async () => {
  await Promise.allSettled([orderStore.getAllOrders(), clientStore.getAllClients()])
})
</script>

<style scoped></style>
