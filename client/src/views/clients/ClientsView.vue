<template>
  <section>
    <PageHeader title="Clientes" subtitle="Area de gerenciamento e visualização de clientes">
      <v-btn size="small" prepend-icon="mdi-plus" color="blue-darken-2" @click="showModal">
        Novo Cliente
      </v-btn>
    </PageHeader>

    <v-card class="my-4">
      <v-data-table :items="allClients" :headers="clientColumns">
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="showModal(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="deleteClient(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <ClientForm ref="clientFormRef" @hidden="closeModal" @submit="save" :loading="loading" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { clientColumns } from '@/models/clients'
import { useClientStore } from '@/stores'
import { storeToRefs } from 'pinia'

import PageHeader from '@/components/pages/PageHeader.vue'
import ClientForm from '@/components/forms/ClientForm.vue'

const clientStore = useClientStore()

const { allClients } = storeToRefs(clientStore)
const clientFormRef = ref<typeof ClientForm | null>(null)
const loading = ref(false)

function showModal(data: any) {
  clientFormRef?.value?.show(data)
}

function closeModal() {
  clientFormRef?.value?.hide()
}

async function save(data: any) {
  try {
    loading.value = true

    data?.id ? await clientStore.updateClient(data) : await clientStore.saveClient(data)

    closeModal()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function deleteClient(data: any) {
  await clientStore.deleteClient(data.id)
}

onMounted(async () => {
  await clientStore.getAllClients()
})
</script>

<style scoped></style>
