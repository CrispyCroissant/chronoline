import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StartGame from "../views/StartGame.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { hasFooter: true },
  },
  {
    path: "/start",
    name: "StartGame",
    component: StartGame,
    meta: { hasFooter: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
