<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import SidebarItem from "@/layouts/components/OperatorNavBar/sidebarItem.vue"
import { getCssVariableValue } from "@/utils"

const sidebarMenuItemHeight = getCssVariableValue(
  "--v3-sidebar-menu-item-height"
)
const sidebarMenuHoverBgColor = getCssVariableValue(
  "--v3-sidebar-menu-hover-bg-color"
)

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const { sidebar } = storeToRefs(appStore)

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})

const isCollapse = computed(() => !sidebar.value.opened)
</script>

<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper operator-menu">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        mode="horizontal"
        :collapse-transition="false"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
          :is-top="true"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

// 设置菜单的样式
:deep(
    .el-menu.el-menu--horizontal
      .el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger
  ) {
  background-image: url("../../../assets/imgs/operate/flod.png"); /* 替换为你的图标文件路径 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  background-size: 25px;
  background-position: center; /* 背景图片居中 */
  padding-left: 0;
  width: 100%;
  height: 100%;
}
:deep(.el-sub-menu .el-icon.el-sub-menu__icon-more) {
  opacity: 0 !important;
}
.el-scrollbar {
  // 多 5% 是为了在顶部模式时不显示垂直滚动条
  height: 105%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
      display: flex !important;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
    }
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        @include tip-line;
      }
    }
  }
}
</style>
