import { ref } from 'vue'
import { defineStore } from 'pinia'

import ProductAPI from './service'
import { removeItemByField, updateItemByField } from '@/utils/Array'

export const useProductStore = defineStore('productStore', () => {
  const allProducts = ref<Array<any>>([])
  const product = ref({})

  async function getAllProducts() {
    const data = await ProductAPI().getAllProducts()

    allProducts.value = data
  }

  async function deleteProduct(id: number) {
    const data = await ProductAPI().deleteProduct(id)

    removeItemByField(allProducts.value, 'id', data.id)
  }

  async function updateProduct(obj: any) {
    const data = await ProductAPI().updateProduct(obj)

    updateItemByField(allProducts.value, 'id', data.id, data)
  }

  async function saveProduct(obj: Record<string, string>) {
    const data = await ProductAPI().saveProduct(obj)

    allProducts.value.unshift(data)
  }

  return {
    allProducts,
    product,
    getAllProducts,
    saveProduct,
    updateProduct,
    deleteProduct
  }
})
