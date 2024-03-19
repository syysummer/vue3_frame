<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus"
import FixedVirtualList from "./fixed/index.vue"
import VariableSizeList from "./variable/variable-size-list.vue"

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="virtual-list">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="固定尺寸" name="first">
        <FixedVirtualList />
      </el-tab-pane>
      <el-tab-pane label="动态尺寸" name="second">动态尺寸虚拟列表</el-tab-pane>
      <el-tab-pane label="可变尺寸" name="third">
        <VariableSizeList />
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
