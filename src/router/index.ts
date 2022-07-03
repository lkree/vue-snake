import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/game/GameView.vue')
    },
    {
      path: '/end',
      name: 'end',
      component: () => import('@/views/endGame/EndGameScreen.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/Settings.vue')
    }
  ]
});

export default router;
