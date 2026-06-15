/*
【題目】LeetCode 141. Linked List Cycle

給定鏈結串列頭節點 head，判斷是否有環。

範例:
  輸入: 3->2->0->-4，且尾端連回索引 1 的節點
  輸出: true
  輸入: 無環的串列
  輸出: false
*/

function ListNode(val, next) { this.val = val === undefined ? 0 : val; this.next = next === undefined ? null : next; }

function buildList(arr) { const dummy = new ListNode(); let t = dummy; for (const v of arr) { t.next = new ListNode(v); t = t.next; } return dummy.next; }

function buildCyclic(arr, pos) { const nodes = arr.map(v => new ListNode(v)); for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1]; if (pos >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[pos]; return nodes[0] || null; }

function hasCycle(head) {
  // TODO: 實作判斷鏈結串列是否有環
  return false;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(hasCycle(buildCyclic([3, 2, 0, -4], 1)), true);
assert.strictEqual(hasCycle(buildCyclic([1, 2], 0)), true);
assert.strictEqual(hasCycle(buildCyclic([1], -1)), false);
assert.strictEqual(hasCycle(buildList([1, 2, 3])), false);
assert.strictEqual(hasCycle(null), false);
