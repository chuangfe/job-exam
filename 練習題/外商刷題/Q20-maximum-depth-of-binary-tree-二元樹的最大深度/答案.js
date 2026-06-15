/*
【題目】
LeetCode 104. Maximum Depth of Binary Tree（二元樹的最大深度）

敘述：
給定二元樹根節點 root，回傳其最大深度（根到最遠葉節點的節點數）。

範例：
輸入: [3,9,20,null,null,15,7]
輸出: 3
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
 * @return {number}
 */
function maxDepth(root){
  // 遞迴：空節點深度為 0
  if(!root) return 0;
  // 當前節點深度 = 1 + 左右子樹中較深者
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// 時間複雜度 O(n)：每個節點走訪一次
// 空間複雜度 O(h)：遞迴堆疊深度為樹高 h

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(maxDepth(buildTree([3,9,20,null,null,15,7])), 3);
assert.strictEqual(maxDepth(buildTree([1,null,2])), 2);
assert.strictEqual(maxDepth(buildTree([])), 0);
assert.strictEqual(maxDepth(buildTree([1])), 1);

console.log('✅ 通過');
