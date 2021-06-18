import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Checkout from '../views/Checkout.vue';
import Thanks from '../views/Thanks.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/checkout',
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
