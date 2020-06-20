setTimeout(() => {
    console.log('d')
}, 0);
var r1 = new Promise(function(resolve, reject) {
    resolve();
})
r1.then(() => {
    var begin = Date.now();
    while(Date.now() - begin < 1000);
    console.log('c1');
    new Promise(function(resolve, reject) {
        resolve()
    }).then(() => console.log('c2'));
})