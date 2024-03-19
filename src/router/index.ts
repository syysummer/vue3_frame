import { createRouter, RouteRecordRaw } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"

// 在route.ts中使用i18n
import i18n from "../locales/index"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/pages/redirect/index.vue")
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/pages/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    meta: {
      hidden: true
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "概览",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/dashboard",
    component: Layouts,
    name: "Dashboard",
    children: [
      {
        path: "",
        component: () => import("@/pages/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "概览",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/virtual",
    component: Layouts,
    name: "Virtual List",
    children: [
      {
        path: "list",
        component: () => import("@/pages/virtual-list/index.vue"),
        name: "Virtual List index",
        meta: {
          title: "虚拟列表",
          roles: ["admin"],
          svgIcon: "dashboard"
        }
      }
    ]
  },
  {
    path: "/editor",
    component: Layouts,
    name: "Editor",
    children: [
      {
        path: "index",
        component: () => import("@/pages/editor/index.vue"),
        name: "Editor Index",
        meta: {
          title: "富文本编辑器",
          roles: ["admin"],
          svgIcon: "dashboard"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const thirdLevelRouteCache = true // 三层嵌套路由扁平化
const router = createRouter({
  // history: createWebHashHistory(),
  history,
  routes: thirdLevelRouteCache
    ? flatMultiLevelRoutes(constantRoutes)
    : constantRoutes
  // routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route: any) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
