/*
【題目】LeetCode 21. Merge Two Sorted Lists

給定兩個升冪排序鏈結串列 list1、list2，合併為一個升冪串列並回傳頭節點。

範例:
  輸入: list1 = 1->2->4, list2 = 1->3->4
  輸出: 1->1->2->3->4->4
*/

function ListNode(val, next) { this.val = val === undefined ? 0 : val; this.next = next === undefined ? null : next; }

function buildList(arr) { const dummy = new ListNode(); let t = dummy; for (const v of arr) { t.next = new ListNode(v); t = t.next; } return dummy.next; }

function toArray(head) { const out = []; while (head) { out.push(head.val); head = head.next; } return out; }

function mergeTwoLists(list1, list2) {
  // TODO: 實作合併兩個排序鏈結串列
  return list1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(toArray(mergeTwoLists(buildList([1, 2, 4]), buildList([1, 3, 4]))), [1, 1, 2, 3, 4, 4]);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([]), buildList([]))), []);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([]), buildList([0]))), [0]);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([5]), buildList([1, 2]))), [1, 2, 5]);
