/*
【題目】
LeetCode 98. Validate Binary Search Tree（驗證二元搜尋樹）

敘述：
給定二元樹根節點 root，判斷是否為合法的二元搜尋樹（左子樹皆小於、右子樹皆大於節點，嚴格）。

範例：
輸入: [2,1,3]            輸出: true
輸入: [5,1,4,null,null,3,6]  輸出: false
*/

// 二元樹節點定義
function TreeNode(val, left, right){
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 由 LeetCode 層序陣列（含 null）建立二元樹
function buildTree(arr){
  if(!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while(q.length && i < arr.length){
    const node = q.shift();
    if(i < arr.length){
      if(arr[i] !== null){ node.left = new TreeNode(arr[i]); q.push(node.left); }
      i++;
    }
    if(i < arr.length){
      if(arr[i] !== null){ node.right = new TreeNode(arr[i]); q.push(node.right); }
      i++;
    }
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root, min = -Infinity, max = Infinity){
  // 空節點視為合法
  if(!root) return true;
  // 當前節點值必須嚴格落在 (min, max) 開區間內
  if(root.val <= min || root.val >= max) return false;
  // 左子樹上界更新為 root.val；右子樹下界更新為 root.val
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
// 時間複雜度 O(n)：每個節點走訪一次
// 空間複雜度 O(h)：遞迴堆疊深度為樹高 h

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isValidBST(buildTree([5,1,4,null,null,3,6])), false);
assert.strictEqual(isValidBST(buildTree([2,1,3])), true);
assert.strictEqual(isValidBST(buildTree([])), true);
assert.strictEqual(isValidBST(buildTree([1])), true);
assert.strictEqual(isValidBST(buildTree([5,4,6,null,null,3,7])), false);

console.log('✅ 通過');
