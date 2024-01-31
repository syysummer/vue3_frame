<script setup lang="ts">
import { useMainStore } from "@/store/modules/main.ts"

const mainStore = useMainStore()
console.log(mainStore.sidebar)
</script>

<template>
  <div  class="home-page">首页内容</div>
</template>

<style lang="scss" scoped>
.home-page {
  color: $font-color;
}
</style>
