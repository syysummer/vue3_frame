let hasSessionStorage = true
let hasLocalStorage = true
//判断当前浏览器是否支持sessionStorage
if (sessionStorage) {
  try {
    sessionStorage.setItem("_sessionStorageTest", "Hello World!")
    sessionStorage.removeItem("_sessionStorageTest")
  } catch (e) {
    hasSessionStorage = false
  }
} else {
  hasSessionStorage = false
}
//判断当前浏览器是否支持localStorage
if (localStorage) {
  try {
    localStorage.setItem("_localStorageTest", "Hello World!")
    localStorage.removeItem("_localStorageTest")
  } catch (e) {
    hasLocalStorage = false
  }
} else {
  hasLocalStorage = false
}
/**
 * 设置本地缓存
 * @param key
 * @param val
 */
export function setLocalStorage(key: string, val?: any): void {
  if (!hasLocalStorage) {
    return
  }
  localStorage.setItem(key, JSON.stringify(val))
}
/**
 * 设置会话级别缓存
 * @param key
 * @param val
 */
export function setSessionStorage(key: string, val: any): void {
  if (!hasSessionStorage) {
    return
  }
  sessionStorage.setItem(key, JSON.stringify(val))
}
