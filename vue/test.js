const a= {
  b: 1
};
function defineLog(obj, key) {
  Object.defineProperty(obj, key, {
      get() {
          console.log('get执行了');
          return this[key];
      },
      set(newValue) {
          // console.log(tmp);
          // console.log(obj[key]);
          console.log(newValue);
          this[key] = newValue;
      }
  })
};
defineLog(a, 'b');
a.b =2;
a.b =3;
console.log(a.b);
