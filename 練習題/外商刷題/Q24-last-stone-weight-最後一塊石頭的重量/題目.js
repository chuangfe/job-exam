/*
【題目】LeetCode 1046. Last Stone Weight（最後一塊石頭的重量）

有一堆石頭 stones，每次取最重的兩顆相撞：
  - 若兩顆重量相等，兩顆都碎掉；
  - 若不相等，較輕的碎掉，較重的剩下兩者重量差。
重複此過程直到至多剩一顆石頭，回傳剩下石頭的重量（若無剩餘則回傳 0）。

可用 MinHeap 存「負值」來模擬 MaxHeap（取出最大值）。

範例：
  輸入：stones = [2,7,4,1,8,1]
  輸出：1

  輸入：stones = [1]
  輸出：1

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
 * @param {number[]} stones
 * @return {number}
 */
function lastStoneWeight(stones) {
  // TODO: 在此實作（提示：把石頭以負值放入 MinHeap 模擬 MaxHeap，
  //       每次取出最大兩顆相撞，差值再放回堆中）
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(lastStoneWeight([2,7,4,1,8,1]), 1);
assert.strictEqual(lastStoneWeight([1]), 1);
assert.strictEqual(lastStoneWeight([2,2]), 0);
assert.strictEqual(lastStoneWeight([3,7,2]), 2);

console.log('✅ 通過');
