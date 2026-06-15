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
  const dummy = new ListNode(0); // 虛擬頭節點，簡化邊界處理
  let tail = dummy;              // tail 指向結果串列的最後一個節點
  while (list1 && list2) {
    // 比較兩串列目前節點，較小者接到結果尾端
    if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
    else { tail.next = list2; list2 = list2.next; }
    tail = tail.next;
  }
  tail.next = list1 ?? list2; // 接上尚未走完的剩餘串列
  return dummy.next;
}
// 時間複雜度 O(n+m)：兩串列各走訪一次
// 空間複雜度 O(1)：直接重接既有節點，未額外配置

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(toArray(mergeTwoLists(buildList([1, 2, 4]), buildList([1, 3, 4]))), [1, 1, 2, 3, 4, 4]);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([]), buildList([]))), []);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([]), buildList([0]))), [0]);
assert.deepStrictEqual(toArray(mergeTwoLists(buildList([5]), buildList([1, 2]))), [1, 2, 5]);

console.log('✅ 通過');
