function Animal() {
    this.species = '动物';
}
function Cat(name, color) {
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}

function Animal2() {
    this.species = '动物';
}
function Cat2(name, color) {
    this.name = name;
    this.color = color;
}
Cat2.prototype = new Animal2();
Cat2.prototype.constructor = Cat2;
var cat2 = new Cat2('大毛', '黄色');
console.log(cat2);

function Animal3() {
}
Animal3.prototype.species = '动物';
function Cat3(name, color) {
    this.name = name;
    this.color = color;
}
Cat3.prototype = Animal3.prototype;
Cat.prototype.constructor = Cat;
var cat3 = new Cat('大猫', '黄色');
console.log(cat3.species);
// 有问题，Animal3.prototype的constructor也会被改掉

var F = function() {
}
F.prototype = Animal3.prototype;
Cat3.prototype = new F();
Cat3.prototype.constructor = Cat;
