console.log('test2 start');
new Promise((resolve, reject) => {
  resolve(2);
}).then((resolve) => {
  console.log('Promise 2' , resolve);
});
setTimeout(() => {
  console.log('test2 timeout');
}, 0);
new Promise((resolve, reject) => {
  resolve(3);
}).then((resolve) => {
  console.log('Promise 3' , resolve);
  new Promise((resolve, reject) => {
    resolve(5);
  }).then(() => {
    console.log('promise resolve 5');
    new Promise((resolve, reject) => {
      console.log('new Promise 6');
      resolve('6');
    }).then(() => {
      console.log('promise resolve 6');
    });
  });
}).then((resolve) => {
  console.log('promise 4' , resolve);
});
console.log('test2 end');