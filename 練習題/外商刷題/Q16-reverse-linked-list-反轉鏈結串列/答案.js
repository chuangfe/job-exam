/*
【題目】LeetCode 206. Reverse Linked List

給定單向鏈結串列的頭節點 head，反轉串列並回傳新的頭節點。

範例:
  輸入: 1->2->3->4->5
  輸出: 5->4->3->2->1
*/

function ListNode(val, next) { this.val = val === undefined ? 0 : val; this.next = next === undefined ? null : next; }

function buildList(arr) { const dummy = new ListNode(); let t = dummy; for (const v of arr) { t.next = new ListNode(v); t = t.next; } return dummy.next; }

function toArray(head) { const out = []; while (head) { out.push(head.val); head = head.next; } return out; }

function reverseList(head) {
  // prev 紀錄已反轉的部分，curr 為目前處理的節點
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next; // 先暫存下一個節點
    curr.next = prev;       // 反轉目前節點的指標
    prev = curr;            // prev 前進
    curr = next;            // curr 前進
  }
  return prev; // prev 即為新的頭節點
}
// 時間複雜度 O(n)：每個節點走訪一次
// 空間複雜度 O(1)：僅使用常數額外指標

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(toArray(reverseList(buildList([1, 2, 3, 4, 5]))), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(toArray(reverseList(buildList([1, 2]))), [2, 1]);
assert.deepStrictEqual(toArray(reverseList(buildList([]))), []);
assert.deepStrictEqual(toArray(reverseList(buildList([7]))), [7]);

console.log('✅ 通過');
