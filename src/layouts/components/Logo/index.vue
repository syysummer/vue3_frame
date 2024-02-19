<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import logo from "@/assets/layouts/logo.png?url"
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
})

const settingsStore = useSettingsStore()
const { layoutMode } = storeToRefs(settingsStore)
</script>

<template>
  <div
    class="layout-logo-container"
    :class="{
      collapse: props.collapse,
      'layout-mode-top': layoutMode === 'top'
    }"
  >
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="layout-logo-con">
          <img :src="logo" class="layout-logo" />
          <div>
            {{
              userStore.roles.indexOf("admin") !== -1
                ? $t("home.logoTitle")
                : "AI运营系统"
            }}
          </div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }

  .layout-logo-con {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    align-items: center;
    color: var(--v3-sidebar-menu-text-color);
    .layout-logo {
      display: block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
