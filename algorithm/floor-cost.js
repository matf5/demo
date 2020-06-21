/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  const len = cost.length;
  const dp = cost.map(i => i);
  dp.push(0);
  console.log(dp);
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + dp[i];
    console.log(i,':', dp[i]);
  }
  return dp[len];
};
const arr = [0, 3, 2, 1];
minCostClimbingStairs(arr);