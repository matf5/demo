function Animal() {
  this.species = 'animal';
};
function Cat(name, age) {
  Animal.call(this, arguments);
  this.name = name;
  this.age = age;
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
const cat = new Cat();
console.log(cat.species);