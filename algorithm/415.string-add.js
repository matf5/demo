/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let i = num1.length - 1;
  let k = num2.length - 1;
  let v = [];
  let tmp = 0;
  while (i > -1 && k > -1) {
    let sum = (num1[i]- '0') + (num2[k] - '0') + tmp;
    if (sum >= 10) {
      tmp = 1;
      sum -= 10;
    } else {
      tmp =0;
    }
    v.push(sum);
    i --;
    k --;
  }
  console.log(v, i ,k);
  while (i > -1) {
    let sum = num1[i] - '0' + tmp;
    if (sum >= 10) {
      tmp = 1;
      sum -= 10;
    } else {
      tmp = 0;
    }
    v.push(sum);
    i--;
  }
  while (k > -1) {
    let sum = num2[k] - '0' + tmp;
    if (sum >= 10) {
      tmp = 1;
      sum -= 10;
    } else {
      tmp = 0;
    }
    v.push(sum);
    k--;
  }
  if (tmp) {
    v.push(tmp);
  }
  console.log(v);
  const res = v.reverse().join('');
  console.log(res);
  return res;
};
addStrings("18582506933032752", "366213329703");
// addStrings('6666', '277777')