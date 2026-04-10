import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewOsView from "@/views/NewOsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/new-os",
      name: "new-os",
      component: NewOsView,
    },
  ],
});

export default router;
