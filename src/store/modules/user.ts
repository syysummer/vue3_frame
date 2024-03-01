import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import {
  getToken,
  removeToken,
  setToken,
  setRefreshToken
} from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi, reqRefreshToken } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import routeSettings from "@/config/route"
import { ElMessage } from "element-plus"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>(["1"]) // 根据用户类型暂时 1 超级管理员 2 运营账号 3 终端账号
  const username = ref<string>("admin")
  const roleList = ref<any>(["admin"]) // 运营账号单独区分角色
  const operateType = ref<string[]>([]) // 当前账号运营的类型(图片，文本标签，语音)

  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  /** 登录 */
  const login = async ({ username, password }: LoginRequestData) => {
    const { data, code, msg } = await loginApi({ username, password })
    if (code === 200) {
      setToken(data.token)
      setRefreshToken(data.refresh)
      token.value = data.token
      const userData: any = {
        userId: data?.userId
      }
      localStorage.setItem("userData", JSON.stringify(userData))
    } else {
      ElMessage.error(msg)
    }
  }

  /*刷新token*/
  const getRefreshToken = async (refresh: any) => {
    const result: any = await reqRefreshToken({ refresh })
    if (result?.code === 200) {
      setToken(result?.data.access)
    } else {
      ElMessage.error(result?.msg)
    }
  }

  /** 获取用户详情 */
  const getInfo = async () => {
    const { code, data } = await getUserInfoApi()
    if (code === 200) {
      username.value = data?.username
      // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
      roleList.value =
        data?.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
      const userTypeMap: any = {
        1: ["admin"],
        2: ["operator"],
        3: ["terminal"]
      }
      // 更新用户等级(测试)
      roles.value = userTypeMap[data?.user_type]
      operateType.value = ["image"] // 默认当前用户是图片相关运营
    }
  }

  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    resetUserInfo()
    resetRouter()
    _resetTagsView()
  }

  /** 重置用户相关信息 **/
  const resetUserInfo = () => {
    token.value = ""
    roles.value = []
    username.value = ""
    roleList.value = []
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return {
    token,
    roles,
    username,
    setRoles,
    login,
    logout,
    resetToken,
    getInfo,
    getRefreshToken,
    changeRoles,
    operateType
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
