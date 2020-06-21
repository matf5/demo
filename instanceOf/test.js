function Foo() {
  this.c = 'c';
}
const foo = new Foo();
function myInstanceOf(a, b) {
  const pro = b.prototype;
  a = a.__proto__;
  while (true) {
    if (a === null) {
      return false;
    }
    if (a === pro) {
      return true;
    }
    a = a.__proto__;
  }
}
console.log(myInstanceOf(foo, Foo));
console.log(Foo instanceof Foo);
console.log(foo instanceof Foo);