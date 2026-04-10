import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { public: true },
    },

    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },

    {
      path: "/new-os",
      name: "new-os",
      component: () => import("@/views/NewOsView.vue"),
    },

    {
      path: "/customer-list",
      name: "customer-list",
      component: () => import("@/views/CustomerListView.vue"),
    },

    {
      path: "/os-list",
      name: "os-list",
      component: () => import("@/views/ServiceOrderListView.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/",
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: "login" };
  }

  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "home" };
  }
});

export default router;
