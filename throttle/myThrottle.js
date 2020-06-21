function Throttle(func, wait = 10, opt = {}) {
  let timeout, context, result;
  let previous = 0;
  const { leading = true, trailing = true } = opt;
  const later = function() {
    previous = !lesading ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
  }
  return function() {
    let now = new Date();
    if (!previous && !leading) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, arguments);
      if (!timeout) {
        context =null;
      }
    } else if (!timeout && trailing) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  }
}