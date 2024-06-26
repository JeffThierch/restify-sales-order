<template>
  <section class="d-flex">
    <section class="w-100">
      <h1 class="text-h4">{{ props.title }}</h1>

      <p class="text-subtitle-2 font-weight-light mt-1">{{ props.subtitle }}</p>
    </section>

    <section class="d-flex flex-column justify-center">
      <slot />
    </section>
  </section>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'subtitle'])
</script>

<style scoped></style>
