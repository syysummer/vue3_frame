import { reactive, ref } from "vue"
import { defineStore } from "pinia"
import { THEME_TYPE } from "@/config/colorConfig"

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

export const useMainStore = defineStore("main", () => {
  /** 侧边栏状态 */
  const sidebar: Sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })

  /*当前语言*/
  const currentLang = ref<string>("zh")

  /*设置当前语言*/
  const changeLang = (val: string) => {
    currentLang.value = val
  }

  /*主题当前主题, 默认主题1*/
  const currentTheme = ref<THEME_TYPE>("theme1")
  const themeOptions = ref([
    {
      label: "主题一",
      value: "theme1"
    },
    {
      label: "主题二",
      value: "theme2"
    },
    {
      label: "主题三",
      value: "theme3"
    }
  ])

  const changeTheme = (val: THEME_TYPE) => {
    currentTheme.value = val
  }

  return {
    sidebar,
    currentLang,
    currentTheme,
    changeLang,
    changeTheme,
    themeOptions
  }
})
