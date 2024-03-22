<script setup lang="ts">
import { ref } from "vue"
import DynamicSizeList from "./dynamic-size-list.vue"

const itemCount = ref<number>(1000)
const rowSizes = new Array(10000)
  .fill(true)
  .map(() => 30 + Math.floor(Math.random() * 30))
const getItemSize = (index: number) => rowSizes[index]
</script>

<template>
  <DynamicSizeList
    class="list"
    :height="600"
    :width="300"
    :item-size="getItemSize"
    :item-count="itemCount"
  />
</template>

<style lang="scss" scoped></style>
