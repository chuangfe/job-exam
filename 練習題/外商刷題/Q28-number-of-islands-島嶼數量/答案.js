/*
【題目】LeetCode 200. Number of Islands（島嶼數量）

給定一個由 '1'（陸地）與 '0'（水）組成的二維網格 grid，
水平或垂直方向相連的陸地會構成一座島嶼，請回傳島嶼的數量。

注意：常見解法會就地修改 grid，因此下方每個 assert 都使用全新的 grid literal。

範例：
  輸入: [["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]]
  輸出: 1   （全部相連的一塊）

  輸入: [["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]]
  輸出: 3   （分散的三塊）
*/

function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length; // 網格的列數與行數
  let count = 0; // 島嶼計數器

  // 深度優先搜尋：把與 (r,c) 相連的陸地全部「淹掉」（標記為 '0'）
  const dfs = (r, c) => {
    // 超出邊界或遇到水就停止
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // 就地標記為已造訪
    dfs(r + 1, c);    // 往下
    dfs(r - 1, c);    // 往上
    dfs(r, c + 1);    // 往右
    dfs(r, c - 1);    // 往左
  };

  // 掃描整個網格，每遇到一塊尚未淹掉的陸地就代表發現一座新島嶼
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // 把整座島嶼淹掉，避免重複計數
      }
    }
  }

  return count;
}

// 複雜度：時間 O(行×列)，每個格子最多造訪一次；空間 O(行×列)，遞迴堆疊最壞情況。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]), 1);
assert.strictEqual(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]), 3);
assert.strictEqual(numIslands([["0"]]), 0);
assert.strictEqual(numIslands([["1"]]), 1);

console.log('✅ 通過');
