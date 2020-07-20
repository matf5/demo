// const a = require('./common');
// const b = require('./common');
// a.age = 4;
// a.addAge();
// console.log(a.age);
// console.log(b);
import { age, addAge } from './importTest.mjs';

console.log(age);
addAge();
console.log(age);