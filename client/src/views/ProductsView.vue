<template>
  <section>
    <PageHeader title="Produtos" subtitle="Area de gerenciamento e visualização de produtos">
      <v-btn size="small" prepend-icon="mdi-plus" color="blue-darken-2" @click="showModal">
        Novo Produto
      </v-btn>
    </PageHeader>

    <v-card class="my-4">
      <v-data-table :items="allProducts" :headers="productColumns">
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="showModal(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="deleteProduct(item)"> mdi-delete </v-icon>
        </template>

        <template v-slot:item.price="{ item }">
          {{ formatCurrency(item.price) }}
        </template>
      </v-data-table>
    </v-card>

    <ProductForm ref="productFormRef" @hidden="closeModal" @submit="save" :loading="loading" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { productColumns } from '@/models/product'
import { useProductStore } from '@/stores'
import { storeToRefs } from 'pinia'

import PageHeader from '@/components/pages/PageHeader.vue'
import ProductForm from '@/components/forms/ProductForm.vue'
import { useCurrency } from '@/composables'

const productStore = useProductStore()
const { formatCurrency } = useCurrency()

const { allProducts } = storeToRefs(productStore)

const productFormRef = ref<typeof ProductForm | null>(null)
const loading = ref(false)

function showModal(data: any) {
  productFormRef?.value?.show(data)
}

function closeModal() {
  productFormRef?.value?.hide()
}

async function save(data: any) {
  try {
    loading.value = true

    data?.id ? await productStore.updateProduct(data) : await productStore.saveProduct(data)

    closeModal()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function deleteProduct(data: any) {
  await productStore.deleteProduct(data.id)
}

onMounted(async () => {
  await productStore.getAllProducts()
})
</script>

<style scoped></style>
