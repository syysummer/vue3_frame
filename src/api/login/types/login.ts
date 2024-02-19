export interface LoginRequestData {
  username: string
  /** 密码 */
  password: string
}
export interface RefreshRequestData {
  refresh: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{
  token: string
  refresh: string
  userId: string
}>

export type UserInfoResponseData = ApiResponseData<{
  username: string
  roles: string[]
}>
