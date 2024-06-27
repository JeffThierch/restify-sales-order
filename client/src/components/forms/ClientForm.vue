<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="showModal" max-width="600">
      <v-card :title="`${formAction} Cliente`">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field v-model="model.name" label="Nome*" required class="mb-0"></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="model.email"
                label="E-mail*"
                required
                class="mb-0"
              ></v-text-field>
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
import { ref } from 'vue'
import { clone } from 'radash'
import { clientModel } from '@/models/clients'

const props = defineProps(['loading'])

const emit = defineEmits<{
  submit: [data: any]
  hidden: []
}>()

const model = ref(clone(clientModel))
const showModal = ref(false)
const formAction = ref('Criar')

function show(data: any) {
  formAction.value = data?.id ? 'Editar' : 'Criar'

  if (data?.id) {
    model.value = { ...model.value, ...data }
  }

  showModal.value = true
}

function hide() {
  showModal.value = false
  formAction.value = 'Criar'
  model.value = clone(clientModel)
}

function submit() {
  emit('submit', model.value)
}

defineExpose({ show, hide })
</script>

<style scoped></style>
