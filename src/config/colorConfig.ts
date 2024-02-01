/**
 * 全局颜色配置项，换肤配置
 * 主题名称theme1以及对应的颜色名称color1后面根据实际主题名和颜色名进行修改
 * 主题名称和颜色名称可以实际情况定义
 */

const COLOR_MAP = {
  // 第一套主题颜色
  theme1: {
    color1: "#000000", // 主要背景
    color2: "#E1BEE7", // 文字颜色
    color3: "#FE6C3D", // 按钮颜色（灰色）
    color4: "#54364B",
    color5: "#F06292", //弹框背景灰色
    color6: "#7986CB", //主要内容区域背景
    color7: "#64B5F6" //选中状态
  },
  // 第二套主题颜色
  theme2: {
    color1: "#000000", // 主要背景
    color2: "#4E342E", // 文字颜色
    color3: "#263238", // 按钮颜色（灰色）
    color4: "#FF6E40",
    color5: "#DD2C00", //弹框背景灰色
    color6: "#616161", //主要内容区域背景
    color7: "#212121" //选中状态
  },
  // 第三套主题颜色
  theme3: {
    color1: "#000000", // 主要背景
    color2: "#FF6D00", // 文字颜色
    color3: "#1B5E20", // 按钮颜色（灰色）
    color4: "#827717",
    color5: "#00C853", //弹框背景灰色
    color6: "#0091EA", //主要内容区域背景
    color7: "#00BFA5" //选中状态
  }
}

/**
 * 类型定义
 * 定义COLOR_MAP中的主题类型，及每个主题中颜色值的类型
 */
export type THEME_TYPE = keyof typeof COLOR_MAP
type THEME_ITEM = keyof (typeof COLOR_MAP)["theme1"]

/**
 * 主题切换
 * @param theme 主题，默认使用主题一
 */
export function changeTheme(theme: THEME_TYPE = "theme1"): void {
  const themeList = Object.keys(COLOR_MAP[theme]) as THEME_ITEM[]
  themeList.forEach((v: THEME_ITEM) => {
    document.body.style.setProperty(`--${v}`, COLOR_MAP[theme][v])
  })
}
