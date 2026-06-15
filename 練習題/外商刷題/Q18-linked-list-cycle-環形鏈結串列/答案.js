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
  // 快慢指標 (Floyd 龜兔賽跑)：slow 每次走一步，fast 每次走兩步
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;        // 慢指標前進一步
    fast = fast.next.next;   // 快指標前進兩步
    if (slow === fast) return true; // 兩指標相遇代表有環
  }
  return false; // fast 走到結尾代表無環
}
// 時間複雜度 O(n)：最多走訪每個節點常數次
// 空間複雜度 O(1)：僅使用兩個指標

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(hasCycle(buildCyclic([3, 2, 0, -4], 1)), true);
assert.strictEqual(hasCycle(buildCyclic([1, 2], 0)), true);
assert.strictEqual(hasCycle(buildCyclic([1], -1)), false);
assert.strictEqual(hasCycle(buildList([1, 2, 3])), false);
assert.strictEqual(hasCycle(null), false);

console.log('✅ 通過');
