// 本地存储
// import storageFun from './storageFun';
let storageFun = null;
if (process.client) {
  storageFun = require('./storageFun');
  storageFun = storageFun.default;
} else {
  storageFun = {};
}

const store = {};

// 本地local存储 方法名与key值对应表
const storeListLocal = {};

// 本地session存储 方法名与key值对应表
const storeListSession = {
  BlogToken: 'blogToken', // token
  UserInfo: 'userInfo', // 用户信息
};

// 本地存储工厂函数，生成 set get remove 方法
const storeFactory = (funcName, key, storeType = 'local') => {
  store[`set${funcName}`] = data => {
    storageFun[storeType].setItem(key, data);
  };
  store[`get${funcName}`] = () => storageFun[storeType].getItem(key);
  store[`remove${funcName}`] = () => storageFun[storeType].removeItem(key);
};

// 循环添加 local 存储方法
Object.keys(storeListLocal).forEach(funName => {
  storeFactory(funName, storeListLocal[funName], 'local');
});

// 循环添加 session 存储方法
Object.keys(storeListSession).forEach(funName => {
  storeFactory(funName, storeListSession[funName], 'session');
});

store.localClear = () => storageFun.local.clear();
store.sessionClear = () => storageFun.session.clear();

export default store;
