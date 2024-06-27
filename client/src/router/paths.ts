const paths = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue')
  },
  {
    path: '/products',
    name: 'Produtos',
    component: () => import('@/views/products/ProductsView.vue')
  },
  {
    path: '/clients',
    name: 'Clientes',
    component: () => import('@/views/clients/ClientsView.vue')
  },
  {
    path: '/orders',
    name: 'Pedidos',
    component: () => import('@/views/orders/OrdersView.vue')
  },
  {
    path: '/orders/:id',
    name: 'Pedido',
    component: () => import('@/views/orders/OrderView.vue'),
    props: true
  }
]

export default paths
