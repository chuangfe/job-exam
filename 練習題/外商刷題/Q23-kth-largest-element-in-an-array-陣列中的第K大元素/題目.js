/*
【題目】LeetCode 215. Kth Largest Element in an Array（陣列中的第 K 大元素）

給定整數陣列 nums 與整數 k，回傳陣列中第 k 大的元素
（排序後第 k 大，不是第 k 個相異值）。

範例：
  輸入：nums = [3,2,1,5,6,4], k = 2
  輸出：5

  輸入：nums = [3,2,3,1,2,4,5,5,6], k = 4
  輸出：4

備註：JS 無內建 Heap，故附上 MinHeap 輔助結構。
*/

// MinHeap 輔助結構（JS 無內建 Heap，故自行實作）
class MinHeap {
  constructor(){ this.data=[]; }
  size(){ return this.data.length; }
  peek(){ return this.data[0]; }
  push(val){ this.data.push(val); this._bubbleUp(this.data.length-1); }
  pop(){ const top=this.data[0]; const last=this.data.pop(); if(this.data.length>0){ this.data[0]=last; this._bubbleDown(0);} return top; }
  _bubbleUp(i){ while(i>0){ const parent=(i-1)>>1; if(this.data[parent]<=this.data[i]) break; [this.data[parent],this.data[i]]=[this.data[i],this.data[parent]]; i=parent; } }
  _bubbleDown(i){ const n=this.data.length; while(true){ let smallest=i; const l=2*i+1, r=2*i+2; if(l<n&&this.data[l]<this.data[smallest]) smallest=l; if(r<n&&this.data[r]<this.data[smallest]) smallest=r; if(smallest===i) break; [this.data[smallest],this.data[i]]=[this.data[i],this.data[smallest]]; i=smallest; } }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // TODO: 在此實作（提示：維護一個大小為 k 的 MinHeap，堆頂即為第 k 大元素）
  return -1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
assert.strictEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
assert.strictEqual(findKthLargest([1], 1), 1);
assert.strictEqual(findKthLargest([7,6,5,4,3,2,1], 7), 1);

console.log('✅ 通過');
