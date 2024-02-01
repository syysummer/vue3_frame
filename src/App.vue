<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ElConfigProvider } from "element-plus"
// 在App.vue中引入主题模块
import { changeTheme } from "@/config/colorConfig"
import { useMainStore } from "@/store/modules/main"

interface ComponentsCom {
  size: "" | "default" | "small" | "large"
  zIndex: number
}

const mainStore = useMainStore()
/*定义element-plus的组件类型及层级*/
const componentsCom = ref<ComponentsCom>({
  size: "default",
  zIndex: 2000
})

onMounted(() => {
  changeTheme(mainStore.currentTheme)
})
</script>

<template>
  <el-config-provider
    :size="componentsCom.size"
    :z-index="componentsCom.zIndex"
  >
    <router-view />
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
