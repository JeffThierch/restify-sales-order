<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="showModal" max-width="600">
      <v-form fast-fail @submit.prevent ref="formRef">
        <v-card :title="`${formAction} Produto`">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="model.name"
                  label="Nome*"
                  required
                  class="mb-0"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" md="12" sm="12">
                <v-number-input
                  control-variant="split"
                  label="Preço*"
                  :step="0.5"
                  :min="0"
                  v-model="model.price"
                  :rules="rules.price"
                ></v-number-input>
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
              type="submit"
              color="primary"
              :text="props.loading ? 'Carregando...' : 'Salvar'"
              variant="tonal"
              @click="submit"
              :disabled="props.loading"
            />
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { clone } from 'radash'
import { productModel } from '@/models/product'
import { useProductValidation } from '@/validations'

const props = defineProps(['loading'])

const emit = defineEmits<{
  submit: [data: any]
  hidden: []
}>()

const { rules } = useProductValidation()

const model = ref(clone(productModel))
const showModal = ref(false)
const formAction = ref('Criar')
const formRef = ref<any>()

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
  model.value = clone(productModel)
}

async function submit() {
  const isFormValid = await validateForm()

  if (!isFormValid) return

  emit('submit', model.value)
}

async function validateForm() {
  const { valid } = await formRef.value.validate()

  return valid
}

defineExpose({ show, hide })
</script>

<style scoped></style>
