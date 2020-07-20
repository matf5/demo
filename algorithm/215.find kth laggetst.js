function quicksort(arr, left, right, k) {
  if (left === k || right === k+1) {
    return;
  }
  const tmp = arr[left];
  if (left < right) {
    let i = left;
    let j = right;
    while (i < j) {
      while (i < j && arr[j] >= tmp) {
        j--;
      }
      if (i < j) {
        arr[i++] = arr[j];
      }
      while (i < j && arr[i] < tmp) {
        i++;
      }
      if (i < j) {
        arr[j--] = arr[i];
      }
    }
    arr[i] = tmp;
    quicksort(arr, left , i -1);
    quicksort(arr, i + 1, right);
  }
}
var findKthLargest = function (nums, k) {
  const length = nums.length;
  if (length === 0 || length < k) {
    return null;
  }
  quicksort(nums, 0, length -1);
  return nums[length - k];
};
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4));