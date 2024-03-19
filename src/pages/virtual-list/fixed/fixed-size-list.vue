<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
  height: {
    type: Number,
    default: 600
  },
  width: {
    type: Number,
    default: 600
  },
  itemSize: {
    type: Number,
    default: 50
  },
  itemCount: {
    type: Number,
    default: 1000
  }
})

/*列表偏移高度*/
const scrollOffset = ref(0)

// 1000个元素撑起盒子的实际高度
const contentStyle = ref({
  height: props.itemSize * props.itemCount,
  width: "100%"
})
const getCurrentChildren = () => {
  // 可视区起始索引
  const startIndex = Math.floor(scrollOffset.value / props.itemSize)
  // 上缓冲区起始索引
  const finialStartIndex = Math.max(0, startIndex - 2)
  // 可视区能展示的元素的最大个数
  const numVisible = Math.ceil(props.height / props.itemSize)
  // 下缓冲区结束索引
  const endIndex = Math.min(props.itemCount, startIndex + numVisible + 2)
  const items: any[] = []
  // 根据上面计算的索引值，不断添加元素给container
  for (let i = finialStartIndex; i < endIndex; i++) {
    items.push(i)
  }
  return items
}

// 当触发滚动就重新计算
const scrollHandle = (event: any) => {
  const { scrollTop } = event.currentTarget
  scrollOffset.value = scrollTop
}
</script>

<template>
  <div
    :style="{
      position: 'absolute',
      width: props.width + 'px',
      height: props.height + 'px',
      overflow: 'auto'
    }"
    @scroll="(e) => scrollHandle(e)"
  >
    <div :style="contentStyle">
      <div
        v-for="(item, index) in getCurrentChildren()"
        :key="index"
        :class="[item % 2 ? 'list-item-odd' : 'list-item-even']"
        :style="{
          position: 'absolute',
          height: props.itemSize + 'px',
          width: '100%',
          color: '#000000',
          // 计算每个元素在container中的top值
          top: props.itemSize * item + 'px'
        }"
      >
        Row {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-item-odd,
.list-item-even {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-item-odd {
  background-color: rgb(228, 227, 242);
}
.list-item-even {
  background-color: rgb(141, 217, 231);
}
</style>
