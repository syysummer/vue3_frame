<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { AppMain, OperatorNavBar, TagsView, Logo } from "./components"
import { onMounted } from "vue"

const settingsStore = useSettingsStore()

onMounted(() => {
  // 运营账号进入主界面清空缓存页面
  useTagsViewStore().delAllVisitedViews()
  useTagsViewStore().delAllCachedViews()
})

const { showTagsView, showLogo } = storeToRefs(settingsStore)
</script>

<!-- 运营相关界面单独一套UI -->
<template>
  <div class="app-wrapper operator-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header operator-header">
      <div class="content">
        <Logo v-if="showLogo" :collapse="false" class="logo" />
        <OperatorNavBar class="navigation-bar" />
      </div>
      <TagsView v-show="showTagsView" />
    </div>
    <!-- 主容器 -->
    <div
      :class="{ hasTagsView: showTagsView }"
      class="main-container operator-main-container"
    >
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @include clearfix;
  width: 100%;

  .operator-header {
    padding-left: 5%;
    padding-right: 5%;
    box-shadow: var(--el-box-shadow-lighter);
    .layout-logo-con {
      height: 54px;
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  .logo.layout-logo-container {
    width: 160px;
    height: var(--v3-operator-header-height);
    line-height: var(--v3-operator-header-height);
    a {
      height: 100%;
      .layout-logo-con {
        height: 100%;
      }
    }
  }
  .content {
    display: flex;
    .navigation-bar {
      flex: 1;
    }
  }
}

.layout-header {
  background-color: var(--v3-header-bg-color);
}

.main-container {
  min-height: 100%;
  &.operator-main-container {
    padding: 0 5%;
  }
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.operator-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.operator-wrapper .hasTagsView .app-main {
  padding-top: 118px;
}

.hasTagsView {
  .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
