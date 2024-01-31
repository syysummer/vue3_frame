import { createRouter,createWebHashHistory} from "vue-router"

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/index.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router