import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { publica: true },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    // Redireciona qualquer rota desconhecida para home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Guard global — redireciona para /login se não autenticado
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.publica && !auth.isAutenticado) {
    return { name: 'login' }
  }
  // Se já está logado e tenta acessar /login, vai para home
  if (to.name === 'login' && auth.isAutenticado) {
    return { name: 'home' }
  }
})

export default router
