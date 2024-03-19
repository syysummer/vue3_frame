<script setup lang="ts">
import { ref } from "vue"
import VariableSizeList from "./variable-size-list.vue"

const rowSizes = new Array(10000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 55))
const getItemSize = (index: number) => rowSizes[index]

const itemCount = ref(1000)
</script>

<template>
  <VariableSizeList
    class="list"
    :height="600"
    :width="300"
    :item-sze="getItemSize"
    :item-count="itemCount"
  />
</template>

<style lang="scss" scoped></style>
