import { ref } from 'vue'
import { defineStore } from 'pinia'

import OrdersAPI from './service'
import { removeItemByField, updateItemByField } from '@/utils/Array'

export const useOrderStore = defineStore('orderStore', () => {
  const allOrders = ref<Array<any>>([])
  const order = ref<{ [key: string]: any }>({})

  async function getAllOrders() {
    const data = await OrdersAPI().getAllOrders()

    allOrders.value = data
  }

  async function deleteOrder(id: number) {
    const data = await OrdersAPI().deleteOrder(id)

    removeItemByField(allOrders.value, 'id', data.id)
  }

  async function updateOrder(obj: any) {
    const data = await OrdersAPI().updateOrder(obj)

    updateItemByField(allOrders.value, 'id', data.id, data)
  }

  async function saveOrder(obj: Record<string, string>) {
    const data = await OrdersAPI().saveOrder(obj)

    allOrders.value.unshift(data)
  }

  async function getById(id: number) {
    const data = await OrdersAPI().getById(id)

    order.value = data
  }

  return {
    allOrders,
    order,
    getAllOrders,
    saveOrder,
    updateOrder,
    deleteOrder,
    getById
  }
})
