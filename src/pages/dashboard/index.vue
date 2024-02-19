<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

/*跳转到首页*/
const jumpToHome = () => {
  router.push("/home/index")
}
</script>

<template>
  <div class="dashboard-page">
    <div class="title">仪表盘</div>
    <div class="control-btn">
      <el-button type="primary" @click="jumpToHome">跳转切换主题</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  margin: 0px auto;
  color: var(--color2);
  padding: 30px;
  display: flex;
  height: 100%;
  justify-content: space-around;
}
</style>
