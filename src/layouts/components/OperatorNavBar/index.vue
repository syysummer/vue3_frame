<script lang="ts" setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import OperatorMenu from "./operatorMenu.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import SearchMenu from "@/components/SearchMenu/index.vue"

const router = useRouter()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

/** 登出 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div class="navigation-bar">
    <!-- 菜单按钮 -->
    <OperatorMenu />

    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />

      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-operator-navbar-height);
  overflow: hidden;
  background: var(--v3-header-bg-color);
  display: flex;
  justify-content: space-between;

  .task-wran-tab {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: var(--el-color-danger);
  }

  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .bell-icon {
      margin-right: 20px;
      .el-icon {
        width: 25px;
        height: 25px;
        box-sizing: content-box;
        cursor: pointer;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }

    .el-dropdown.notify-dropdown-wrap {
      cursor: pointer;
      .el-dropdown-link.el-tooltip__trigger.el-tooltip__trigger {
        border: none;
        outline: none;
      }
    }
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
<style>
.el-popper.is-pure.is-light.el-dropdown__popper {
  z-index: 1999 !important;
}
</style>
