import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home/index.vue')
const Credentials = () => import('@/views/Credentials/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      needAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
