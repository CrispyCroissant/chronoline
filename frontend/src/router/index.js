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
  },
  {
    path: "/start",
    name: "StartGame",
    component: StartGame,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
