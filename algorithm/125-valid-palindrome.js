/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.replace(/\W|_/g, '').toLowerCase();
  let k = s.length - 1;
  let i = 0;
  while (i <= k - 1) {
    if (s[i] !== s[k]) {
      return false;
    }
    i++;
    k--;
  }
  return true;
};
console.log(isPalindrome('A man, a plan, a canal: Panama'));