import { createRouter, createWebHistory } from 'vue-router'
import paths from './paths'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: paths
})

router.beforeEach((to, from, next) => {
  document.title = to.name as string
  next()
})

export default router
