function debounce(func, wait, opt = {}) {
  const { immediate = false } = opt || {};
  let timeout;
  let result;
  return function() {
    const context =this;
    const args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      callNow && func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  }
}