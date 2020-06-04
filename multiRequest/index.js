
const requestFetch = (url) => {
  const promise = new Promise((resolve, reject) => {
    const t = Math.floor(Math.random() * 4) + 1;
    setTimeout(() => {
      console.log(`${url}done`)
      resolve(`${url}done`);
    }, t  * 1000);
  });
  return promise;
};
const multiRequst = (urls, maxNum) => {
  // 初始化任务列表
  let pendingCount = 0;
  let index = 0;
  const sendRequest = (url) => {
    if (!url) {
      return;
    }
    pendingCount++;
    requestFetch(url).then(() => {
      pendingCount--;
      if (urls[index]) {
        sendRequest(urls[index]);
        index++;
      }
    })
  }
  while (pendingCount < maxNum) {
    if (urls[index]) {
      sendRequest(urls[index]);
      index++;
    }
  }
};
multiRequst(['1', '2', '3', '4', '5', '6'], 3);