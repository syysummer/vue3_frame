import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { flatMultiLevelRoutes } from "@/router/helper"
import { useUserStore } from "./user"
import routeSettings from "@/config/route"

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const userStore = useUserStore()
  const routeRoles = route.meta?.roles
  // 数据运营相关界面需要根据用户配置的运营类型动态加载界面 处理图片/语音/文本相关路由
  const handleTypeList: string[] = ["image", "yuyin", "text"]
  handleTypeList.forEach((item: string) => {
    if (
      userStore.operateType.includes(item) &&
      route.meta?.roles?.includes(`${item}-operator`)
    ) {
      const imgOpeIndex: number = route.meta?.roles.indexOf(`${item}-operator`)
      route.meta?.roles.slice(imgOpeIndex, 1)
      route.meta?.roles.push("operator")
    }
  })
  return routeRoles
    ? roles.some((role: any) => routeRoles.includes(role))
    : true
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    const accessedRoutes = routeSettings.async
      ? filterAsyncRoutes(asyncRoutes, roles)
      : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = routeSettings.thirdLevelRouteCache
      ? flatMultiLevelRoutes(accessedRoutes)
      : accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
