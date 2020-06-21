class Dep {
  watchers = [];
  constructor() {
    this.watchers = [];
  }
  addWatcher(watcher) {
    this.watchers.push(watcher);
  }
  removeWatcher() {
    this.watchers = [];
  }
  notify() {
    this.watchers.forEach(watcher => watcher.updateData && watcher.updateData);
  }
}
class Sub {
  deps = []
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  update(v) {
    this.deps.forEach(dep => dep.notify && dep.notify(v));
  }
}
class Watch {
  data = null;
  constructor(data) {
    this.data = data;
  }
  updateData(data) {
    this.data = data;
  }
}