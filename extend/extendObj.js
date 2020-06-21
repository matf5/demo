function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
const Chinese = {
  nation: '中国'
};
const Doctor = object(Chinese);