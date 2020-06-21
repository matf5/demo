function Foo() { this.a = 1 };
const foo = new Foo();
// Foo.prototype.b = 2;
Object.defineProperty(Foo.prototype, 'b', {
  value: 2,
  writable: false
})
foo.b =3;
console.log(foo);