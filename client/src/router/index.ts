import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('@/views/products/ProductsView.vue')
    },
    {
      path: '/clients',
      name: 'Clients',
      component: () => import('@/views/clients/ClientsView.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/orders/OrdersView.vue')
    },
    {
      path: '/orders/:id',
      name: 'Order',
      component: () => import('@/views/orders/OrderView.vue'),
      props: true
    }
  ]
})

export default router
