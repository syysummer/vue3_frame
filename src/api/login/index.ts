import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: `${import.meta.env.VITE_BASE_API}auth_app/login/`,
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<any>({
    url: `${import.meta.env.VITE_BASE_API}auth_app/user/info/`,
    method: "get"
  })
}

/** 刷新Token */
export function reqRefreshToken(data: Login.RefreshRequestData) {
  return request<any>({
    url: `${import.meta.env.VITE_BASE_API}auth_app/refresh/`,
    method: "post",
    data
  })
}
