let ProxyCreateSingleton = (function(){
  let instance;
  return function(name) {
      // 代理函数仅作管控单例
      if (instance) {
          return instance;
      }
      return instance = new Singleton(name);
  }
})();

// 独立的Singleton类，处理对象实例
let Singleton = function(name) {
  this.name = name;
}
Singleton.prototype.getName = function() {
  console.log(this.name);
}

let Winner = new PeozyCreateSingleton('Winner');
let Looser = new PeozyCreateSingleton('Looser');

console.log(Winner === Looser); // true
console.log(Winner.getName());  // 'Winner'
console.log(Looser.getName());  // 'Winner'