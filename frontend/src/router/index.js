import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../App.vue";
export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [{ path: "/", component: HomeView }]
});
