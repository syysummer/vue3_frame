import { createApp } from "vue"
import store from "@/store"
import router from "@/router"
import i18n from "@/locales/index"
import "@/style.css"
import App from "@/App.vue"

import "uno.css"
import "@/styles/index.scss"

const app = createApp(App)

/*将语言国际化挂载到全局*/
app.config.globalProperties.t = i18n
app.use(store).use(i18n).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
