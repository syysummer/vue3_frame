<script lang="ts" setup>
import { computed, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import useResize from "./hooks/useResize"
import LeftMode from "./LeftMode.vue"
import TopMode from "./TopMode.vue"
import LeftTopMode from "./LeftTopMode.vue"
// import OperateMode from "./OperateMode.vue"
import { DeviceEnum } from "@/constants/app-key"
import { getCssVariableValue, setCssVariableValue } from "@/utils"
// import { useUserStoreHook } from "@/store/modules/user"

/** Layout 布局响应式 */
useResize()

const appStore = useAppStore()
const settingsStore = useSettingsStore()
// const userStore = useUserStoreHook()

const { layoutMode, showTagsView, showGreyMode, showColorWeakness } =
  storeToRefs(settingsStore)

const classes = computed(() => {
  return {
    showGreyMode: showGreyMode.value,
    showColorWeakness: showColorWeakness.value
  }
})

// /*是否是管理员账号*/
// const isAdminAccount = computed(() => {
//   return userStore.roles.indexOf("admin") !== -1
// })
// /*是否是运营账号*/
// const isOperateAccount = computed(() => {
//   return userStore.roles.indexOf("operator") !== -1
// })

//#region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = "--v3-tagsview-height"
const v3TagsviewHeight = getCssVariableValue(cssVariableName)
watchEffect(() => {
  showTagsView.value
    ? setCssVariableValue(cssVariableName, v3TagsviewHeight)
    : setCssVariableValue(cssVariableName, "0px")
})
//#endregion
</script>

<template>
  <div :class="classes">
    <!-- 左侧模式 (管理员账号) -->
    <LeftMode
      v-if="layoutMode === 'left' || appStore.device === DeviceEnum.Mobile"
    />
    <!-- 顶部模式 (管理员账号)-->
    <TopMode v-else-if="layoutMode === 'top'" />
    <!-- 混合模式 (管理员账号)-->
    <LeftTopMode v-else-if="layoutMode === 'left-top'" />
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
