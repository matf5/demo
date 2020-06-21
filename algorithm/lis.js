// 0 8 1 12 2 10;
const lis = (arr) => {
  const len = arr.length;
  const dp = new Array(len);
  for (let i = 0; i < len; i++ ) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  console.log(dp);
};
const arr1 = [0, 8, 1, 12, 2, 10];
console.log(arr1);
lis(arr1);