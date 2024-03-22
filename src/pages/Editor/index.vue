<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from "vue"
// @ts-ignore
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const EditorShow = ref(true)

// 内容 HTML
const valueHtml = ref("hello")
// 图片预览
const imgViewerRef = ref()
const imageList = ref<string[]>([])
const currentPreview = ref(0)
const isImagePreview = ref(false)

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = `<p>模拟 Aj <a href="http://172.23.88.142/ai/AIOperations" target="_blank">AI运营平台</a> ax 异步设置内容 <img src="https://img-qn.51miz.com/preview/photo/00/01/51/26/new-P-1512602-6C1160D0O.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fw/300" alt="风景图" data-href="https://img-qn.51miz.com/preview/photo/00/01/51/26/new-P-1512602-6C1160D0O.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fw/300" style=""/></p>`
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      server: "http://172.23.88.142:1999/api/pictures_upload_image",
      "tenant-id": "1",
      fieldName: "file", // 这里有个坑，如果返回的响应结果是没有上传文件，跟这里关系很大
      customInsert(res: any, insertFn: any) {
        if (Number(res.code) === 200) {
          console.log(res.data, "res.data")
          insertFn(
            "http://172.23.88.142:1999/images/" + res.data,
            null,
            "http://172.23.88.142:1999/images/" + res.data
          )
        }
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  EditorShow.value = false
  editor && editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor: any) => {
  const clildrenList = editor.children?.[0]?.children || []
  imageList.value = []
  clildrenList.forEach((item: any) => {
    if (item.type === "image") {
      imageList.value.push(item.src)
    }
  })
}
const handleDestroyed = (editor: any) => {
  console.log("destroyed", editor)
}
const handleFocus = (editor: any) => {
  console.log("focus", editor)
}
const handleBlur = (editor: any) => {
  console.log("blur", editor)
}
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor: any, event: any, callback: any) => {
  console.log("ClipboardEvent 粘贴事件对象", event)
  const html = event.clipboardData.getData("text/html") // 获取粘贴的 html
  const text = event.clipboardData.getData("text/plain") // 获取粘贴的纯文本
  const rtf = event.clipboardData.getData("text/rtf") // 获取 rtf 数据（如从 word wsp 复制粘贴）
  console.log(rtf, "rtf")
  const regex = /<!--StartFragment-->(.*?)<!--EndFragment-->/
  const matches = html.match(regex)
  if (matches[1]) {
    const currentHtml = editor.getHtml()
    const targetHtml = currentHtml.slice(0, -4) + matches[1] + "</p>"
    valueHtml.value = targetHtml
    // 自定义插入内容
    editor.setHtml(targetHtml)
  } else {
    editor.insertText(text)
  }

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault()
  callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
}
const printText = () => {
  console.log(valueHtml.value, "valueHtml==")
}

/*事件代理处理图片的点击事件*/
const handleClickImage = (e: any) => {
  const isImageTag = e.target instanceof HTMLImageElement
  if (isImageTag) {
    const targetSrc = e.target.src
    currentPreview.value = imageList.value.indexOf(targetSrc)
    isImagePreview.value = true
    nextTick(() => {
      imgViewerRef.value.setActiveItem(currentPreview.value)
    })
  }
}
// 关闭图片预览
const handleClosePreview = () => {
  isImagePreview.value = false
}

// 切换图片预览
const handleSiwtchPreview = (index: any) => {
  currentPreview.value = index
}
</script>

<template>
  <div class="editor-wrap">
    <div
      v-if="EditorShow"
      style="border: 1px solid #ccc"
      @click="(e: any) => handleClickImage(e)"
    >
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :default-config="toolbarConfig"
      />
      <Editor
        v-model="valueHtml"
        style="height: 500px; overflow-y: hidden"
        :default-config="editorConfig"
        @on-created="handleCreated"
        @on-destroyed="handleDestroyed"
        @on-change="handleChange"
        @on-focus="handleFocus"
        @on-blur="handleBlur"
        @custom-alert="customAlert"
        @custom-paste="customPaste"
      />
    </div>
    <el-button
      type="primary"
      :style="{ position: 'absolute', zIndex: 100, bottom: '100px' }"
      @click="printText"
    >
      获取富文本内容
    </el-button>

    <el-image-viewer
      v-if="isImagePreview"
      ref="imgViewerRef"
      :src="imageList[currentPreview]"
      :zoom-rate="1.2"
      :initial-index="0"
      :z-index="3000"
      :url-list="imageList"
      @close="handleClosePreview"
      @switch="handleSiwtchPreview"
    />
  </div>
</template>

<style lang="scss" scoped></style>
