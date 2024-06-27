import { ref } from 'vue'
import { defineStore } from 'pinia'

import ClientAPI from './service'
import { removeItemByField, updateItemByField } from '@/utils/Array'

export const useClientStore = defineStore('clientStore', () => {
  const allClients = ref<Array<any>>([])
  const client = ref({})

  async function getAllClients() {
    const data = await ClientAPI().getAllClients()

    allClients.value = data
  }

  async function deleteClient(id: number) {
    const data = await ClientAPI().deleteClient(id)

    removeItemByField(allClients.value, 'id', data.id)
  }

  async function updateClient(obj: any) {
    const data = await ClientAPI().updateClient(obj)

    updateItemByField(allClients.value, 'id', data.id, data)
  }

  async function saveClient(obj: Record<string, string>) {
    const data = await ClientAPI().saveClient(obj)

    allClients.value.unshift(data)
  }

  return {
    allClients,
    client,
    getAllClients,
    saveClient,
    updateClient,
    deleteClient
  }
})
