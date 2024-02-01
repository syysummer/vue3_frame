# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### 框架搭建过程

```
相关参考文章：
https://juejin.cn/post/7325243117861879818
https://blog.csdn.net/qq_36435177/article/details/133324030?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-133324030-blog-115206267.235^v43^pc_blog_bottom_relevance_base7&spm=1001.2101.3001.4242.1&utm_relevant_index=1
https://juejin.cn/post/7127130027992285197#heading-69
https://juejin.cn/post/7327965216826032154?searchId=202401310940470AEE53A5AF3A846C29A8

安装相关依赖及功能扩展：
1. 代码规范： ESLint + Prettier + husky + lint-staged
2. 安装Pinia: pnpm add pinia
3. Typescript相关模块声明
4. 安装vue-router实现路由跳转，封装动态理由加载模块 premission
pnpm add vue-router@next
pnpm add -D @types/node
5. sass安装 postCss优化viewport: pnpm add sass
6. 引入国际化插件: pnpm add vue-i18n@next
7. 多主题切换支持：使用CSS实现多主题切换
8. 引入组件库element-plus
pnpm add element-plus
按需引入： pnpm add -D unplugin-vue-components unplugin-auto-import
9. 引入可视化仓库 echarts
pnpm add echarts


10. 添加layout布局
11. Nprogress页面跳转中加载中动画；
12. Pinia状态持久化；
```
