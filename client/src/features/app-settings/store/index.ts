import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppSettingStore = defineStore('appSettingStore', () => {
  const theme = ref<string>(localStorage.getItem('app-theme') ?? 'light')

  function changeTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('app-theme', theme.value)
  }

  return {
    theme,
    changeTheme
  }
})
