function Animal() {
  this.species = 'animal';
};
function Cat(name, age) {
  this.name = name;
  this.age = age;
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
const cat = new Cat();
console.log(cat.species);