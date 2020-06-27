const a= {
    'b': 1
};
let tmp = a.b;
function defineLog(obj, key) {
    Object.defineProperty(obj, key, {
        get() {
            console.log('get执行了');
            return tmp;
        },
        set(newValue) {
            console.log(tmp);
            // console.log(obj[key]);
            console.log(newValue);
            tmp = newValue;
        }
    })
};
defineLog(a, 'b');
a.b =2;
a.b =3;
console.log(a.b);
