import zh from "./langs/zh" // 中文语言配置
// import en from "./langs/en" // 英文语音配置
import { createI18n } from "vue-i18n"

const config = localStorage.getItem("config") // 当前使用的语言类型
let lang = "zh"
if (config) {
  lang = JSON.parse(config).lang || "zh"
}
const i18n = createI18n({
  legacy: false, // componsition API需要设置为false
  locale: lang,
  globalInjection: true, // 可以在template模板中使用$t
  messages: {
    zh
    // en
  }
})

export default i18n
