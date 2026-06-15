# 外商／台積電 LeetCode 刷題練習（前端工程師專用版）

> 對象：React 主力、接觸過一點 Node 的前端工程師。JS/TS 熟練，但演算法與資料結構需要系統性加強。
> 本目錄依 NeetCode 主題順序漸進排列，題目以 Blind 75 經典題為主，全部為可執行的 JavaScript LeetCode 程式題。

## 使用方式

每題一個資料夾，命名規則為 `Q<兩位數編號>-<英文 slug>-<中文短名>/`，內含兩個檔案：

- **`題目.js`**：最上方為 `/* 【題目】 */` 區塊（LeetCode 編號、英文題名、繁體中文敘述、範例），接著是函式 stub（簽名正確、`// TODO`、預設回傳），最底下為 `// ===== 測試 =====` 測試區（`node:assert`）。**尚未實作時 `node 題目.js` 會拋出 AssertionError**，這是預期行為——請在 stub 內填入你的解法直到測試通過。
- **`答案.js`**：完整解答（含繁體中文註解與時間／空間複雜度）＋ 相同測試。`node 答案.js` 全數通過後會印出 `✅ 通過`。

```bash
# 練習（會拋錯，直到你寫對）
node Q01-two-sum-兩數之和/題目.js

# 對答案（印出 ✅ 通過）
node Q01-two-sum-兩數之和/答案.js
```

每個檔案皆可獨立執行；需要輔助結構（`ListNode`、`TreeNode`、`MinHeap` 等）的題目，已在兩個檔案內各自定義好，無須額外相依套件（僅使用 Node 內建的 `node:assert`）。

---

## 題目目錄

### 1. Arrays & Hashing（陣列與雜湊）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q01 | Two Sum（LC 1） | Arrays & Hashing | Easy | [資料夾](./Q01-two-sum-兩數之和/) |
| Q02 | Valid Anagram（LC 242） | Arrays & Hashing | Easy | [資料夾](./Q02-valid-anagram-有效的字母異位詞/) |
| Q03 | Group Anagrams（LC 49） | Arrays & Hashing | Medium | [資料夾](./Q03-group-anagrams-字母異位詞分組/) |

### 2. Two Pointers（雙指標）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q04 | Valid Palindrome（LC 125） | Two Pointers | Easy | [資料夾](./Q04-valid-palindrome-驗證回文/) |
| Q05 | 3Sum（LC 15） | Two Pointers | Medium | [資料夾](./Q05-3sum-三數之和/) |
| Q06 | Container With Most Water（LC 11） | Two Pointers | Medium | [資料夾](./Q06-container-with-most-water-盛最多水的容器/) |

### 3. Sliding Window（滑動視窗）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q07 | Best Time to Buy and Sell Stock（LC 121） | Sliding Window | Easy | [資料夾](./Q07-best-time-to-buy-and-sell-stock-買賣股票的最佳時機/) |
| Q08 | Longest Substring Without Repeating Characters（LC 3） | Sliding Window | Medium | [資料夾](./Q08-longest-substring-without-repeating-characters-無重複字元的最長子字串/) |
| Q09 | Longest Repeating Character Replacement（LC 424） | Sliding Window | Medium | [資料夾](./Q09-longest-repeating-character-replacement-最長重複字元替換/) |

### 4. Stack（堆疊）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q10 | Valid Parentheses（LC 20） | Stack | Easy | [資料夾](./Q10-valid-parentheses-有效的括號/) |
| Q11 | Min Stack（LC 155） | Stack | Medium | [資料夾](./Q11-min-stack-最小堆疊/) |
| Q12 | Daily Temperatures（LC 739） | Stack | Medium | [資料夾](./Q12-daily-temperatures-每日溫度/) |

### 5. Binary Search（二分搜尋）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q13 | Binary Search（LC 704） | Binary Search | Easy | [資料夾](./Q13-binary-search-二分搜尋/) |
| Q14 | Search in Rotated Sorted Array（LC 33） | Binary Search | Medium | [資料夾](./Q14-search-in-rotated-sorted-array-搜尋旋轉排序陣列/) |
| Q15 | Koko Eating Bananas（LC 875） | Binary Search | Medium | [資料夾](./Q15-koko-eating-bananas-科科吃香蕉/) |

### 6. Linked List（鏈結串列）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q16 | Reverse Linked List（LC 206） | Linked List | Easy | [資料夾](./Q16-reverse-linked-list-反轉鏈結串列/) |
| Q17 | Merge Two Sorted Lists（LC 21） | Linked List | Easy | [資料夾](./Q17-merge-two-sorted-lists-合併兩個排序鏈結串列/) |
| Q18 | Linked List Cycle（LC 141） | Linked List | Easy | [資料夾](./Q18-linked-list-cycle-環形鏈結串列/) |

### 7. Trees（樹）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q19 | Invert Binary Tree（LC 226） | Trees | Easy | [資料夾](./Q19-invert-binary-tree-翻轉二元樹/) |
| Q20 | Maximum Depth of Binary Tree（LC 104） | Trees | Easy | [資料夾](./Q20-maximum-depth-of-binary-tree-二元樹的最大深度/) |
| Q21 | Binary Tree Level Order Traversal（LC 102） | Trees | Medium | [資料夾](./Q21-binary-tree-level-order-traversal-二元樹的層序遍歷/) |
| Q22 | Validate Binary Search Tree（LC 98） | Trees | Medium | [資料夾](./Q22-validate-binary-search-tree-驗證二元搜尋樹/) |

### 8. Heap / Priority Queue（堆積 / 優先佇列）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q23 | Kth Largest Element in an Array（LC 215） | Heap / Priority Queue | Medium | [資料夾](./Q23-kth-largest-element-in-an-array-陣列中的第K大元素/) |
| Q24 | Last Stone Weight（LC 1046） | Heap / Priority Queue | Easy | [資料夾](./Q24-last-stone-weight-最後一塊石頭的重量/) |

> 註：JS 沒有內建 Heap，本主題兩題的 `題目.js`／`答案.js` 內皆已附上手刻的 `MinHeap` 輔助結構。

### 9. Backtracking（回溯）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q25 | Subsets（LC 78） | Backtracking | Medium | [資料夾](./Q25-subsets-子集/) |
| Q26 | Combination Sum（LC 39） | Backtracking | Medium | [資料夾](./Q26-combination-sum-組合總和/) |
| Q27 | Permutations（LC 46） | Backtracking | Medium | [資料夾](./Q27-permutations-全排列/) |

### 10. Graphs（圖論）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q28 | Number of Islands（LC 200） | Graphs | Medium | [資料夾](./Q28-number-of-islands-島嶼數量/) |
| Q29 | Clone Graph（LC 133） | Graphs | Medium | [資料夾](./Q29-clone-graph-複製圖/) |
| Q30 | Course Schedule（LC 207） | Graphs | Medium | [資料夾](./Q30-course-schedule-課程表/) |

### 11. Dynamic Programming（動態規劃）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q31 | Climbing Stairs（LC 70） | Dynamic Programming | Easy | [資料夾](./Q31-climbing-stairs-爬樓梯/) |
| Q32 | House Robber（LC 198） | Dynamic Programming | Medium | [資料夾](./Q32-house-robber-打家劫舍/) |
| Q33 | Coin Change（LC 322） | Dynamic Programming | Medium | [資料夾](./Q33-coin-change-零錢兌換/) |
| Q34 | Longest Increasing Subsequence（LC 300） | Dynamic Programming | Medium | [資料夾](./Q34-longest-increasing-subsequence-最長遞增子序列/) |

### 12. Greedy / Intervals（貪心 / 區間）

| 編號 | 題目（LC#） | 主題 | 難度 | 連結 |
|------|-------------|------|------|------|
| Q35 | Jump Game（LC 55） | Greedy / Intervals | Medium | [資料夾](./Q35-jump-game-跳躍遊戲/) |
| Q36 | Merge Intervals（LC 56） | Greedy / Intervals | Medium | [資料夾](./Q36-merge-intervals-合併區間/) |
| Q37 | Non-overlapping Intervals（LC 435） | Greedy / Intervals | Medium | [資料夾](./Q37-non-overlapping-intervals-無重疊區間/) |

---

## 刷題策略（給前端工程師的實戰建議）

- **先廣後深**：先把 12 個主題各刷 2-3 題建立「題型反射」，再回頭針對弱項（DP、圖論）加練。Blind 75 / NeetCode 150 是性價比最高的清單。
- **善用 JS 內建**：`Map`／`Set`（O(1) 查找）、解構交換 `[a,b]=[b,a]`、`Array.from`、`reduce`。但記住 **JS 沒有內建 Heap**，把 `MinHeap` 模板背熟；也注意 `Array.shift()` 是 O(n)，大資料的 BFS 用頭指標索引代替。
- **計時練習**：Easy 目標 10-15 分鐘、Medium 20-30 分鐘。寫不出來先看提示而非直接看答案。
- **複習錯題**：記下「卡在哪個觀念」而非整段程式碼，隔 1 天、3 天、1 週各重寫一次，直到能默寫模板（二分、回溯、BFS/DFS、1D DP）。
- **講出來**：外商面試重視溝通，練習時邊寫邊口述「資料結構選擇、複雜度、邊界條件」。

---

**最後更新**：2026-06-15
