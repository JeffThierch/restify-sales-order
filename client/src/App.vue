<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="showLateralMenu" width="290">
      <v-list-item
        lines="three"
        prepend-avatar="/favicon.ico"
        title="Restify Sales Order"
        subtitle="1.0.0"
        nav
      >
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="menuItem of menuItems"
        :prepend-icon="menuItem.icon"
        lines="two"
        link
        :title="menuItem.title"
        :to="menuItem.to"
      />
    </v-navigation-drawer>

    <v-app-bar>
      <section class="d-flex justify-space-between w-100 mx-3">
        <v-app-bar-nav-icon @click="toggleLateralMenu"></v-app-bar-nav-icon>

        <v-btn @click="appSettings.changeTheme()" class="align-self-center">
          <v-icon
            :icon="userTheme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'"
          />
        </v-btn>
      </section>
    </v-app-bar>

    <v-main>
      <RouterView class="mx-4 mt-7" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useAppSettingStore } from './stores'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { menuItems } from '@/utils/MenuItems'

const appSettings = useAppSettingStore()
const { theme: userTheme } = storeToRefs(appSettings)
const showLateralMenu = ref(true)

const theme = useTheme()

function toggleLateralMenu() {
  showLateralMenu.value = !showLateralMenu.value
}

watch(
  () => userTheme.value,
  () => {
    theme.global.name.value = userTheme.value
  },
  { immediate: true }
)
</script>

<style scoped></style>
