var CQueue = function() {
  this.arr = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.arr.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  return this.arr.shift() || -1;
};
const obj = new CQueue();
obj.appendTail(1);
const param = obj.deleteHead();
console.log(param);

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */