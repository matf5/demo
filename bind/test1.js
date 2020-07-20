Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw error('need a function');
  }
  const args1 = Array.prototype.slice.call(arguments, 1);
  const self = this;
  const fBound = function() {
    const args2 = args1.concat(Array.prototype.slice.call(arguments, 1));
    if (this instanceof fBound) {
      if (self.prototype) {
        const empty = {};
        empty.prototype = self.prototype;
        fBound.prototype = empty;
      }
      return self.apply(this, args2);
    } else {
      return self.apply(context, args2);
    }
  }
} 