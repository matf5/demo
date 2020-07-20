const date1 = new Date();
let arr = new Array(10000000);
for (const a of arr) {
  // console.log(a);
}
const date2 = new Date();

const date3 = new Date();
for (let i = 0; i < arr.length; i++) {
  // console.log(arr[i]);
}
const date4 = new Date();

const date5 = new Date();
arr.forEach((item) => {
  // console.log(item);
});
const date6 = new Date();
console.log('const of cost: ', date2 - date1);
console.log('for cost: ', date4 - date3);
console.log('for each', date6 - date5);