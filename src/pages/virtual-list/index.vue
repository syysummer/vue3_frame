<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus"
import FixedVirtualList from "./fixed/index.vue"
import VariableSizeList from "./variable/index.vue"
import DynamicSizeList from "./dynamic/index.vue"

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="virtual-list">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="固定尺寸" name="first">
        <FixedVirtualList v-if="activeName === 'first'" />
      </el-tab-pane>
      <el-tab-pane label="动态尺寸" name="second">
        <DynamicSizeList v-if="activeName === 'second'" />
      </el-tab-pane>
      <el-tab-pane label="可变尺寸" name="third">
        <VariableSizeList v-if="activeName === 'third'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tab-pane) {
  height: 600px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.list {
  border: 1px solid gray;
}
</style>
