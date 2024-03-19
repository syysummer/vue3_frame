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
    type: Function,
    default: () => 50
  },
  itemCount: {
    type: Number,
    default: 1000
  },
  itemEstimatedSize: {
    type: Number,
    default: 50
  }
})

/*列表偏移高度*/
const scrollOffset = ref(0)
// 元数据
const measuredData = ref<any>({
  measuredDataMap: {},
  LastMeasuredItemIndex: -1
})

const estimatedHeight = (defaultEstimatedItemSize = 50, itemCount: any) => {
  let measuredHeight = 0
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData.value
  // 计算已经获取过真实高度的项的高度之和
  if (LastMeasuredItemIndex >= 0) {
    const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex]
    measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size
  }
  // 未计算过真实高度的项数
  const unMeasuredItemsCount =
    itemCount - measuredData.value.LastMeasuredItemIndex - 1
  // 预测总高度
  const totalEstimatedHeight =
    measuredHeight + unMeasuredItemsCount * defaultEstimatedItemSize
  console.log(totalEstimatedHeight, "totalEstimatedHeight======")
  return totalEstimatedHeight
}

const getItemMetaData = (index: number) => {
  const { itemSize } = props
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData.value
  // 如果当前索引比已记录的索引要大，说明要计算当前索引的项的size和offset
  if (index > LastMeasuredItemIndex) {
    let offset = 0
    // 计算当前能计算出来的最大offset值
    if (LastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex]
      offset += lastMeasuredItem.offset + lastMeasuredItem.size
    }
    // 计算直到index为止，所有未计算过的项
    for (let i = LastMeasuredItemIndex + 1; i <= index; i++) {
      const currentItemSize = itemSize(i)
      measuredDataMap[i] = { size: currentItemSize, offset }
      offset += currentItemSize
    }
    // 更新已计算的项的索引值
    measuredData.value.LastMeasuredItemIndex = index
  }
  return measuredDataMap[index]
}

const getStartIndex = (scrollOffset: number) => {
  const { itemCount } = props
  let index = 0
  const whileConst = true
  while (whileConst) {
    const currentOffset = getItemMetaData(index).offset
    if (currentOffset >= scrollOffset) {
      return index
    }
    if (index >= itemCount) {
      return itemCount
    }
    index++
  }
}

const getEndIndex = (startIndex: number) => {
  const { height, itemCount } = props
  // 获取可视区内开始的项
  const startItem = getItemMetaData(startIndex)
  // 可视区内最大的offset值
  const maxOffset = startItem.offset + height
  // 开始项的下一项的offset，之后不断累加此offset，直到等于或超过最大offset，就是找到结束索引了
  let offset = startItem.offset + startItem.size
  // 结束索引
  let endIndex = startIndex
  // 累加offset
  while (offset <= maxOffset && endIndex < itemCount - 1) {
    endIndex++
    const currentItem = getItemMetaData(endIndex)
    offset += currentItem.size
  }
  return endIndex
}

const getRangeToRender = (scrollOffset: number) => {
  const { itemCount } = props
  const startIndex: any = getStartIndex(scrollOffset)
  const endIndex = getEndIndex(startIndex)
  return [
    Math.max(0, startIndex - 2),
    Math.min(itemCount - 1, endIndex + 2),
    startIndex,
    endIndex
  ]
}

const getCurrentChildren = () => {
  const [startIndex, endIndex] = getRangeToRender(scrollOffset.value)
  const items = []
  for (let i = startIndex; i <= endIndex; i++) {
    const item = getItemMetaData(i)
    const itemStyle = {
      position: "absolute",
      height: item.size,
      width: "100%",
      top: item.offset
    }
    items.push({
      index: i,
      itemStyle: itemStyle
    })
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
    class="variable-list-wrap"
    :style="{
      position: 'relative',
      width: props.width + 'px',
      height: props.height + 'px',
      overflow: 'auto',
      willChange: 'transform'
    }"
    @scroll="(e: any) => scrollHandle(e)"
  >
    <div
      class="variable-list"
      :style="{
        height: estimatedHeight(props.itemEstimatedSize, props.itemCount),
        width: '100%'
      }"
    >
      <div
        v-for="(item, index) in getCurrentChildren()"
        :key="index"
        :class="[item.index % 2 ? 'list-item-odd' : 'list-item-even']"
        :style="{
          position: 'absolute',
          height: item.itemStyle.height,
          width: '100%',
          top: item.itemStyle.top
        }"
      >
        Row {{ item.index }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  border: 1px solid gray;
}

.list-item-odd,
.list-item-even {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-item-odd {
  background-color: lightblue;
}
.list-item-even {
  background-color: lightcoral;
}
</style>
