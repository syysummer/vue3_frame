<script setup lang="ts">
import { ref } from "vue"
// 在App.vue中引入主题模块
import { changeTheme } from "@/config/colorConfig"
import { useMainStore } from "@/store/modules/main"
import { THEME_TYPE } from "@/config/colorConfig"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const mainStore = useMainStore()
const router = useRouter()
const { locale, setLocaleMessage, getLocaleMessage } = useI18n()

const themeValue = ref<THEME_TYPE>(mainStore.currentTheme)

const handleBtnClick = (val: THEME_TYPE) => {
  if (mainStore.currentTheme === val) {
    return
  }
  mainStore.changeTheme(val)
  changeTheme(val)
}

/*中文切换*/
const changeLanguage = () => {
  const lang = mainStore.currentLang === "zh" ? "en" : "zh"
  mainStore.changeLang(lang)
  locale.value = lang
  changeLocaleLang(lang)
}

/*动态更新i18n的语言及语言包*/
const changeLocaleLang = (lang: string) => {
  if (Object.keys(getLocaleMessage("en")).length) {
    locale.value = lang
    return
  }
  import(`../../locales/langs/${lang}.ts`).then((message) => {
    locale.value = lang
    setLocaleMessage(lang, message.default)
  })
}

/*跳转到仪表盘dashboard*/
const jumpToDashboard = () => {
  router.push("/dashboard")
}
</script>

<template>
  <div class="home-page">
    <div class="home-page-inner">
      <div class="title">{{ $t("home.title") }}</div>
      <div class="control-btn">
        <el-button type="primary" @click="jumpToDashboard">
          跳转仪表盘
        </el-button>
        <el-button type="primary" @click="changeLanguage">切换语言</el-button>

        <div class="toggle-theme">
          <div class="label">切换主题</div>
          <el-select
            v-model="themeValue"
            class="m-2"
            placeholder="Select"
            size="large"
            style="
               {
                width: 240px;
              }
            "
            @change="handleBtnClick"
          >
            <el-option
              v-for="item in mainStore.themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  .home-page-inner {
    width: 600px;
    height: 800px;
    margin: 0px auto;
    background-color: var(--color1);
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      width: 100%;
      height: 80px;
      color: var(--color3);
      background-color: var(--color4);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .control-btn {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      el-button {
        border: none;
        outline: none;
        color: var(--color2);
      }

      .toggle-theme {
        .label {
          width: 120px;
        }
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
