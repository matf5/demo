/**
 * @param {number[]} prices
 * @return {number}
 */
// dp [i][k][0] dp[i][k][1]
// 当前天数，股票交易次数，当前是否持有
function judge(prices, k) {
  if (prices.length < 1) {
    return 0;
  }
  const dp = Array.from(new Array(prices.length), () => Array.from(new Array(k + 1), () => new Array(2).fill(0)));
  for (let i = 0; i <= k; i ++) {
    dp[0][i][0] = 0;
    dp[0][i][1] = -prices[0];
  }
  for (let i =1; i < prices.length; i++) {
    for (let d = 1; d <= k; d++) {
      dp[i][d][0] = Math.max(dp[i-1][d][0], dp[i-1][d][1] + prices[i]);
      dp[i][d][1] = Math.max(dp[i-1][d][1], dp[i-1][d-1][0] - prices[i]);
    }
  }
  return dp[prices.length - 1][k][0];
}
var maxProfit = function(prices) {
  return judge(prices, 2);
};
maxProfit([1, 2, 3]);
maxProfit([]);