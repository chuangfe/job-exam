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
  // TODO: 實作驗證二元搜尋樹
  return true;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isValidBST(buildTree([5,1,4,null,null,3,6])), false);
assert.strictEqual(isValidBST(buildTree([2,1,3])), true);
assert.strictEqual(isValidBST(buildTree([])), true);
assert.strictEqual(isValidBST(buildTree([1])), true);
assert.strictEqual(isValidBST(buildTree([5,4,6,null,null,3,7])), false);
