class Watcher {
  constructor(expr, vm, cb) {
    this.expr = expr;
    this.vm = vm;
    this.cb = cb;
    // 通过getter对数据进行绑定， 标记当前的watcher
    this.oldValue = this.getOldValue();
  }
  getOldValue() {
      Dep.target = this;
      const oldValue = utils.getValue(this.expr, this.vm);
      Dep.target = null;
      return oldValue;
  }
  update() {
    const newValue = utils.getValue(this.expr, this.vm);
    if (newValue !== this.oldValue) {
        this.cb && this.cb(newValue);
    }
  }
};
class Dep {
    constructor() {
      this.collect =[];
    }
    addWatcher(watcher) {
      this.collect.push(watcher);
    }
    notify() {
        this.collect.forEach(w => w.update());
    }
}

const utils = {
  getValue(expr, vm) {
      // 可以优化 比如运算符之类
      return vm.$data[expr.trim()]
  },
  setValue(expr, vm, newValue) {
      vm.$data[expr] = newValue
  },
  model(node, value, vm) {
     const initValue = this.getValue(value, vm);
     new Watcher(value, vm, (newValue) => {
         this.modelUpdater(node, newValue);
     });
     node.addEventListener('input', (e) => {
         const newValue = e.target.value;
         this.setValue(value, vm, newValue);
     })
     this.modelUpdater(node, initValue);
     console.log(initValue);
  },
  modelUpdater(node, value) {
      node.value = value;
  },
  text(node, value, vm) {
    let result;
    if (value.includes('{{')) {
        result = value.replace(/\{\{(.+)\}\}/g, (...args) => {
            const expr = args[1];
           new Watcher(expr, vm, (newValue) => {
               this.textUpdater(node, newValue);
           })
           return this.getValue(args[1], vm);
        });
    } else  {
       // v-text="xxx"
       result = this.getValue(value, vm);
    }
    this.textUpdater(node, result);
  },
  textUpdater(node, value) {
      node.textContent = value;
  },
  on(node, value, vm, eventName) {
    const fn = vm.$options.methods[value];
    
  }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // const fragment = compierFragment(this.el);
        this.compile(this.el);
        // this.el.appendChild(fragment);
    }
    compile(fragment) { // 换行符也是text
      const childNodes = Array.from(fragment.childNodes);
      childNodes.forEach(childNode => {
        console.dir(childNode);
        if (this.isElementNode(childNode)) {
            // h1/ input v-开头
            this.compileElement(childNode);
        } else if (this.isTextNode(childNode)) {
            // 看是否有 {{}}
            this.compileText(childNode);
        } 
        // 深度优先递归
        if (childNode.childNodes && childNode.childNodes.length) {
            this.compile(childNode);
        }
      });
    }
    compileElement(node) {
        // v-model v-text v-html v-on:click
      const attributes = Array.from(node.attributes);
      attributes.forEach(attr => {
          const { name, value } = attr;
          console.log('attr', name, value);
          if (this.isDirector(name)) {
            const [, directive] = name.split('-');
            const [compileKey, eventName] = directive.split(':');
            utils[compileKey](node, value, this.vm, eventName);
            console.log(directive, value);
          } else if (this.isEventName(name)) {
            const [, eventName] = name.split('@');
            utils['on'](node, value, this.vm, eventName);
          }
      })
    }
    isDirector(name) {
      return name.startsWith('v-');
    }
    isEventName(name) {
        return name.startsWith('@');
    }
    compileText(node) {
        const content = node.textContent;
        if (/\{\{(.+)\}\}/.test(content)) {
           utils['text'](node, content, this.vm);
        }
    }
    isElementNode(el) {
        return el.nodeType === 1;
    }
    isTextNode(el) {
        return el.nodeType === 3;
    }
    compileFragment(el) {
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            f.appendChild(firstChild); // 会删除原来的元素
        }
        console.dir(f);
        return f;
    }
}

class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data,key, data[key]); // 会传递嘛？
            })
        }
    }
    defineReactive(obj ,key, value) {
        this.observe(value);
        // 依赖了哪些dom
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                const target = Dep.target;
                target && dep.addWatcher(target);
                console.log('$data get', key, value);
                return value;
            },
            set: (newVal) => {
                if (value === newVal) return;
                console.log('$data set', key, value);
                this.observe(newVal);
                dep.notify();
                value = newVal;
            }
        })
    }
}
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        new Observer(this.$data);
        new Compiler(this.$el, this);
        this.proxyData(this.$data);
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        })
    }
}