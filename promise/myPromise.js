const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECT = 'reject';

function myPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallBacks = [];
  that.rejectCallBacks = [];
  function resolve(value) {
    if (value instanceof myPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallBacks.forEach(cb => cb(that.value));
      }
    }, 0);
  }
  function reject(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECT;
        that.value = value;
        that.rejectCallBacks.forEach(cb => cb(that.value));
      }
    }, 0);
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
myPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };
  if (that.state === PENDING) {
    const promise2 = new myPromise((resolve, reject) => {
      that.resolvedCallBacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
      that.rejectedCallBacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      })
    });
    return promise2;
  }
  if (that.state === RESOLVED) {
    const promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    })
  }
  if (that.state === REJECT) {
    onRejected(that.value);
  }
  function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Error'))
    }
    let called = false
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              resolutionProcedure(promise2, y, resolve, reject)
            },
            e => {
              if (called) return
              called = true
              reject(e)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
}
const myprom = new myPromise((resolve, reject) => {
  resolve(1);
});
myprom.then((value) => {
  console.log(value);
})