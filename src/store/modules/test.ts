import { reactive } from "vue"
import { defineStore } from "pinia"

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

export const useTestStore = defineStore("test", () => {
  /** 侧边栏状态 */
  const sidebar: Sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })
  return { sidebar }
})
