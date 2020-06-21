console.log('test1 start');
for (let i =0; i<1000000;i++) {
}
new Promise((resolve, reject) => {
  resolve(1);
}).then((resolve) => {
  console.log('Promise 1' , resolve);
});
setTimeout(() => {
  console.log('test1 timeout start');
}, 1000);
console.log('test1 end');