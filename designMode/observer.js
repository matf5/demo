class Publisher {
  constructor(deps) {
    this.deps = deps;
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify(data) {
    this.deps.forEach(dep => typeof dep.updateData === 'function' && dep.updateData(data));
  }
}
class Dep {
  constructor(data) {
    this.data = data;
  }
  updateData(data) {
    this.data = data;
  }
}
const dep1 = new Dep(1);
const dep2 = new Dep(2);
const publisher = new Publisher([dep1, dep2]);
publisher.notify(3);
console.log(dep1, dep2);
// 所有观察者都能收到通知