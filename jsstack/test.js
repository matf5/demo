function runStack(n) {
  console.log(n);
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2;
  }
  return runStack(n -2) + runStack(n -1);
}
runStack(50000);
function runStack(n) {
  
}

   