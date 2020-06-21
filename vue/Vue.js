class Vue {
  constructor(data) {
    this.data = data;
    this.reactive(data);
  }
  reactive(data) {
    if (typeof data === 'object') {
      Object.keys(data).forEach(key => this.defineReative(data, key));
    }
    return data;
  }
  defineReative(data, key) {
    let val = data[key];
    Object.defineProperty(data, key, {
      get() {
        console.log('get', val);
        return val;
      },
      set(newVal) {
        val = newVal;
        console.log('set', newVal)
      }
    })
  }
  updateData(key, value) {
    this.data[key] = value;
  }
}
const vue = new Vue({
  text: '1'
});
vue.updateData('text', '2');
console.log(vue.data.text);