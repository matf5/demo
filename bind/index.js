
Function.prototype.myBind = function(tls) {
  if (typeof this !== "function") {
    throw new TypeError('');
  }
  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;
  const bound = function () {
    const boundArgs = args.concat(Array.prototype.slice.call(arguments));
    if (this instanceof bound) {
      if (self.prototype) {
        function Empty() {}
        Empty.prototype = self.prototype;
        bound.prototype = new Empty();
      }
      const result = self.apply(this, boundArgs);
      return result;
    } else {
      return self.apply(tls, boundArgs);
    }
  }
  return bound;
}
function foo(name) {
  this.name = name;
}
var obj = {};
var bar = foo.myBind(obj);
bar('jack');
console.log(obj.name);