// import { setSessionStorage, setLocalStorage, getSessionStorage, getLocalStorage } from "./storage"

// const getStorageTypeMap: AnyObj = {
//   sessionStorage: getSessionStorage,
//   localStorage: getLocalStorage
// };

// const setStorageTypeMap: AnyObj = {
//   sessionStorage: setSessionStorage,
//   localStorage: setLocalStorage
// };

// const plugin = (options: Options): any => {
//   // key 为标识前缀，避免命名空间冲突
//   const { key, storeList } = options;
//   return (context: PiniaPluginContext) => {
//     const { store } = context;
//     let storageType: any;
//     let obj: any = {};
//     for (const item of storeList) {
//       if (item.storeName.includes(store.$id)) {
//         // storeName 为哪个store，path 为store下某个字段
//         const { storeName, path } = item;

//         storageType = item.storageType;
//         // 如果key 不存在默认走 pinia
//         const data = getStorageTypeMap[storageType](
//           `${key ?? 'pinia'}-${store.$id}`
//         );
//         if (data) {
//           // 更新store
//           store.$patch(data);
//         }
//         if (path && path.length > 0) {
//           // 如果存在path 则需要判断
//           if (storeName.length === 1) {
//             path.forEach((item: any) => {
//               obj[item] = store.$state[item];
//             });
//           } else {
//             return new Error('配置path 时只允许配置一个storeName');
//           }
//         }
//         obj = path && path.length > 0 ? obj : store.$state;
//         storeName.includes(store.$id) &&
//           store.$subscribe(() => {
//             setStorageTypeMap[storageType](
//               `${key ?? 'pinia'}-${store.$id}`,
//               toRaw(obj)
//             );
//           });
//       }
//     }
//   };
// };
