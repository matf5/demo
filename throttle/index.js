const throttle = (func, wait = 0, execFirstCall) => {
  let timeout = null;
  let args;
  let firstCallTimeStamp;
  function throttled(...arg) {
    if (!firstCallTimeStamp) {
      firstCallTimeStamp = new Date.getTime();
    }
    if (!execFirstCall || !args) {
      args = arg;
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    return new Promise(async (res, rej) => {
      if (new Date.getTime() - firstCallTimeStamp >= wait) {
        try {
          const result = await func.apply(this, args);
          res(result)
        } catch (e) {
          rej(e);
        } finally {
          cancel();
        }
      } else {
        tiemout = setTimeout(async () => {
          try {
            const result = await func.apply(this, args);
            res(result);
          } catch (e) {
            rej(e)
          } finally {
            cancel();
          }
        }, firstCallTimeStamp + wait - new Date().getTime())
      }
    })
  }
  // 允许取消
  function cancel() {
    clearTimeout(timeout)
    args = null
    timeout = null
    firstCallTimestamp = null
  }
  // 允许立即执行
  function flush() {
    cancel()
    return func.apply(this, args)
  }
  throttled.cancel = cancel
  throttled.flush = flush
  return throttle
}