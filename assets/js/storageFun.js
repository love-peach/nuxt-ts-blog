const { localStorage, sessionStorage } = window;

// 组合使用构造函数模式和原型模式
function Storage(type) {
  this.staorageType = type;
}
Storage.prototype = {
  constructor: Storage,
  setItem(key, value) {
    this.staorageType.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    const value = this.staorageType.getItem(key);
    // TODO: try catch 是因为 之前存值的时候没有 JSON.stringify，导致获取的时候 直接 JSON.parse 会报错。
    let valueResult = '';
    try {
      valueResult = JSON.parse(value);
    } catch (err) {
      valueResult = value;
    }
    return valueResult;
  },
  clear() {
    this.staorageType.clear();
  },
  removeItem(key) {
    this.staorageType.removeItem(key);
  },
  multiGet(keys) {
    const values = {};
    keys.forEach(key => {
      values[key] = this.getItem(key);
    });
    return values;
  },
  multiRemove(keys) {
    keys.forEach(key => this.removeItem(key));
  },
};

const local = new Storage(localStorage);
const session = new Storage(sessionStorage);

export default {
  local,
  session,
};
