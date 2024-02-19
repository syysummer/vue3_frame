import { createApp } from "vue"
import store from "@/store"
import router from "@/router"
import i18n from "@/locales/index"
import App from "@/App.vue"

import "@/router/permission"
// load
import { loadSvg } from "@/icons"

// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"

const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)

/*将语言国际化挂载到全局*/
app.config.globalProperties.t = i18n
app.use(store).use(i18n).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
