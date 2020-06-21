const getParamFromSearch = (key) => {
  const i = window.location.search.indexOf('?');
  if (i === -1) {
    return undefined;
  }
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const r = window.location.search.substr(i+1).match(reg);
  if (r) {
    return decodeURIComponent(r[2]);
  }
  return undefined;
};
const getParamFromHash = (key) => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const i = window.location.hash.indexOf('?');
  if (i === -1) return undefined;
  const r = window.location.hash.substr(i + 1).match(reg);
  if (r) return decodeURIComponent(r[2]);
  return undefined;
};