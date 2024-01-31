import { createApp } from "vue"
import store from "@/store"
import router from "@/router"
import "./style.css"
import App from "./App.vue"

import "uno.css"
import "@/styles/index.scss"

const app = createApp(App)
app.use(store).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
