let getSingleton = function(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
}
let createAlertMsg = function(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}
let createSingleAlertMsg = getSingleton(createAlertMsg);
document.body.addEventListener('click', function() {
  let alertMsg = createSingleAlertMsg('略略略');
  alertMsg.style.display = 'block';
});