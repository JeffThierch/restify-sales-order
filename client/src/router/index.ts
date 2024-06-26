import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('@/views/ProductsView.vue')
    },
    {
      path: '/clients',
      name: 'Clients',
      component: () => import('@/views/ClientsView.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/OrdersView.vue')
    }
  ]
})

export default router
