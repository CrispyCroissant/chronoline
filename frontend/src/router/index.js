import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StartGame from "../views/StartGame.vue";
import PlayGame from "../views/PlayGame.vue";
import RoomNotFound from "../views/RoomNotFound.vue";

Vue.use(VueRouter);

const DEFAULT_TITLE = "Chronoline";

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
    meta: { hasFooter: true, pageTitle: `${DEFAULT_TITLE} | Create room` },
  },
  {
    path: "/play/:id?",
    name: "PlayGame",
    component: PlayGame,
    meta: { hasFooter: false, pageTitle: `${DEFAULT_TITLE} | Playing...` },
  },
  {
    path: "/no-room",
    name: "RoomNotFound",
    component: RoomNotFound,
    meta: { hasFooter: true, pageTitle: `${DEFAULT_TITLE} | No room` },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  Vue.nextTick(() => {
    document.title = to.meta.pageTitle || "Chronoline";
    next();
  });
});

export default router;
