import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/Home.vue";
import HomeView from "../views/List-party.vue";
export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    { path: "/", name: "index", component: IndexView },
    {
      path: "/home",
      name: "home",
      component: HomeView
    }
  ]
});
