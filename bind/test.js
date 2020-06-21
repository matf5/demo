Function.prototype.myBind = function(myThis) {
  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;
  const bound = function() {
    const boundArgs = args.concat(Arry.prototype.slice.call(arguments));
    if (this instanceof bound) {
      if (self.prototype) {
        function empty() {};
        empty.prototype = self.prototype;
        bound.prototype = new empty();
      }
      return self.apply(this, boundArgs);
    } else {
      return self.apply(myThis, boundArgs);
    }
  }
}