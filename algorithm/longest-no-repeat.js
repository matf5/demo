// afdfabcd

function findMax(s) {
  let index = 0;
  let max = 0;
  const map = new Map();
  for (let i = 0; i< s.length; i++) {
    if (map.has(s[i]) && map.get(s[i]) >= index) {
        index = map.get(s[i]) + 1;
    }
    max = Math.max(i - index + 1, max);
    map.set(s[i], i);
  }
  return max;
}
console.log(findMax('afdfabcd'));