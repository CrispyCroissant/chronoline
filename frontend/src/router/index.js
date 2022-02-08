import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StartGame from "../views/StartGame.vue";
import PlayGame from "../views/PlayGame.vue";

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
  {
    path: "/play/:id?",
    name: "PlayGame",
    component: PlayGame,
    meta: { hasFooter: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
