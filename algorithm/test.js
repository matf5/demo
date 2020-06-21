var maxProfit = function(prices) {
  let len = prices.length;
  if(len === 0) return 0;
  let k = 2;
  //dp[i][j][n]: i代表天数，j代表交易次数，n代表是否持有股票，0代表不持有， 1代表持有
  let dp = Array.from(new Array(len), () => new Array(k + 1));
  for (let i = 0; i < len; i++) {
      for (let j = 0; j<= k; j++) {
          dp[i][j] = new Array(2).fill(0);
      }
  }
  for(let i = 0; i< len; i++) {
      for (let j = k; j > 0; j--) {
          if(i === 0) {
              //第i天，还有j次，手里不持有股票，当i = 0,手里不持有股票，最大利润为0
              dp[i][j][0] = 0;
              //当i = 0, 手里持有股票，因为还没盈利，最大利润为 -prices[i]
              dp[i][j][1] = -prices[i];
              continue;
          }
          //今天手里不持股，比较(1:前一天没有股票，2:前一天持有股票，今天卖出去了，利润+prices[i])
          dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1] + prices[i]);
          //今天手里持股，比较(1: 前一天持股，2: 前一天不持股，今天持股，成本-prices[i])
          dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i]);
      }
      console.log('第', i, '天', dp);
  }
  return dp[len-1][k][0];
};
console.log(maxProfit([]));

