const prom = new Promise((resolve, reject) => {
  resolve(1);
});
prom.then((value) => {
  return new Promise((resolve, reject) => {
    resolve(value + 1);
  })
}).then((value) => {
  console.log(value);
});