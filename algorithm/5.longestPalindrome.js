/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function(s) {
//   const len = s.length;
//   let max = 0;
//   let res = '';
//   for (let i = 0; i < len; i++) {
//     let left1 = i;
//     let right1 = i;
//     let count1 = 1;
//     left1--;
//     right1++;
//     while (left1 > -1 && right1 < len) {
//       if (s[left1] === s[right1]) {
//         left1 --;
//         right1++;
//         count1 += 2;
//       } else {
//         break;
//       }
//     }
//     console.log('1: ', left1, right1, count1, s.substr(left1 + 1, count1));
//     if (count1 > max) {
//       res = s.substr(left1 + 1, count1);
//       max = count1;
//     }
//     let left2 = i;
//     let right2 = i + 1;
//     let count2 = 0;
//     while (left2 > -1 && right2 < len) {
//       if (s[left2] === s[right2]) {
//         left2--;
//         right2++;
//         count2 += 2;
//       } else {
//         break;
//       }
//     }
//     if (count2 > max) {
//       res = s.substr(left2 + 1, count2);
//       max = count2;
//     }
//     console.log('2: ', left2, right2, count2, s.substr(left2 + 1, count2));
//   }
//   return res;
// };


var longestPalindrome = function(s) {
  if (!s || s.length < 2) {
    return s;
  }
  let len = s.length;
  let start = 0,end = 0;
  const centerExpand = (left, right) => {
    while (left >= 0 && right < len && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left -1;
  }
  for (let i = 0; i < len; i++) {
    let len1 = centerExpand(i, i);
    let len2 = centerExpand(i, i+1);
    let maxLen = Math.max(len1, len2);
    if (maxLen > end - start) {
      start = i - ((maxLen - 1) >> 1);
      end = i + (maxLen >> 1);
    }
  }
  return s.substring(start,end+1);
}

console.log(longestPalindrome('cbbd'));
// console.log(longestPalindrome('abc'));
