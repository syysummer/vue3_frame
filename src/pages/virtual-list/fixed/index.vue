<script setup lang="ts">
import FixedSizeList from "./fixed-size-list.vue"
</script>

<template>
  <FixedSizeList
    class="list"
    :height="600"
    :width="300"
    :item-size="50"
    :item-count="1000"
  />
</template>

<style lang="scss" scoped></style>
