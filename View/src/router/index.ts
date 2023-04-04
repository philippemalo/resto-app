import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/Admin.vue";
import { useAuthStore } from "../stores/auth";
import { session } from "../services/api";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/notfound",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/notfound",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.path === "/admin") {
    const response = await session();
    if (response.data === null) {
      return { path: "/login" };
    }
  }
});

export default router;
