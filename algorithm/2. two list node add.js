/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let tmp = 0;
  let res = new ListNode('head');
  tmpNode = res.next;
  while (l1 || l2) {
    const l1Val = l1.val || 0;
    const l2Val = l2.val || 0;
    let sum = l1Val + l2Val + tmp;
    tmp = sum > 9 ? 1 : 0;
    sum = sum > 9 ? sum - 10 : sum;
    tmpNode = new ListNode(sum);
    tmpNode = tmpNode.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (tmp) {
    tmpNode.next = new ListNode(tmp);
  }
  return res.next;
};