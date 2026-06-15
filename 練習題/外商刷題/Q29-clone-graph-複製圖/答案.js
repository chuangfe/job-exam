/*
【題目】LeetCode 133. Clone Graph（複製圖）

給定無向連通圖中一個節點的參考，回傳該圖的深拷貝（deep copy）。
每個節點包含一個整數 val 與一個鄰居陣列 neighbors。

節點結構：{ val: number, neighbors: Node[] }

由於圖中可能含有環，需用 Map 記錄「原節點 -> 複製節點」的對應，
避免重複複製造成無窮遞迴。

範例：
  經典 LC 範例為 4 個節點互相連接的圖（adj = [[1,3],[0,2],[1,3],[0,2]]），
  回傳的複本結構與原圖相同，但所有節點都是全新的物件。
*/

function cloneGraph(node) {
  if (!node) return null;           // 空圖直接回傳 null
  const cloned = new Map();         // 原節點 -> 已複製節點

  const dfs = (curr) => {
    // 若此節點已複製過，直接回傳複本（處理環、避免重複）
    if (cloned.has(curr)) return cloned.get(curr);
    const copy = { val: curr.val, neighbors: [] }; // 先建立節點本身
    cloned.set(curr, copy);         // 在遞迴鄰居「之前」就登記，才能處理環
    for (const nei of curr.neighbors) {
      copy.neighbors.push(dfs(nei)); // 遞迴複製每個鄰居並接上
    }
    return copy;
  };

  return dfs(node);
}

// 複雜度：時間 O(V+E)，每個節點與每條邊各處理一次；空間 O(V)，Map 與遞迴堆疊。

// ===== 測試 =====
const assert = require('node:assert');

// 以鄰接表建立圖，回傳第一個節點（val 從 1 開始）
function buildGraph(adj) {
  const nodes = adj.map((_, i) => ({ val: i + 1, neighbors: [] }));
  adj.forEach((nbrs, i) => {
    for (const j of nbrs) nodes[i].neighbors.push(nodes[j]);
  });
  return nodes[0] || null;
}

// BFS 走訪整張圖，回傳 { val -> 排序後的鄰居 val 陣列 }，方便比對結構
function flatten(node) {
  if (!node) return {};
  const seen = new Set();
  const q = [node];
  const out = {};
  while (q.length) {
    const n = q.shift();
    if (seen.has(n)) continue;
    seen.add(n);
    out[n.val] = n.neighbors.map(x => x.val).sort((a, b) => a - b);
    for (const m of n.neighbors) if (!seen.has(m)) q.push(m);
  }
  return out;
}

const g = buildGraph([[1, 3], [0, 2], [1, 3], [0, 2]]);
const c = cloneGraph(g);
assert.notStrictEqual(c, g);                    // 必須是全新物件
assert.deepStrictEqual(flatten(c), flatten(g)); // 結構必須相同

assert.strictEqual(cloneGraph(null), null);     // 空圖

const s = buildGraph([[]]);                     // 單一節點、無鄰居
const cs = cloneGraph(s);
assert.notStrictEqual(cs, s);
assert.deepStrictEqual(flatten(cs), { 1: [] });

console.log('✅ 通過');
