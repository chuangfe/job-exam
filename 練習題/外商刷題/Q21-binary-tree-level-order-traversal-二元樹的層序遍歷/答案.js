/*
【題目】
LeetCode 102. Binary Tree Level Order Traversal（二元樹的層序遍歷）

敘述：
給定二元樹根節點 root，回傳由上而下、由左而右的層序遍歷（每層一個陣列）。

範例：
輸入: [3,9,20,null,null,15,7]
輸出: [[3],[9,20],[15,7]]
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
 * @return {number[][]}
 */
function levelOrder(root){
  const res = [];
  if(!root) return res;
  // BFS：用佇列逐層處理
  const queue = [root];
  while(queue.length){
    const size = queue.length; // 當前這一層的節點數
    const level = [];
    for(let i = 0; i < size; i++){
      const node = queue.shift();
      level.push(node.val);
      // 將下一層節點加入佇列
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
// 時間複雜度 O(n)：每個節點走訪一次
// 空間複雜度 O(n)：佇列最多存放一層的節點，最壞為 O(n)

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(levelOrder(buildTree([3,9,20,null,null,15,7])), [[3],[9,20],[15,7]]);
assert.deepStrictEqual(levelOrder(buildTree([1])), [[1]]);
assert.deepStrictEqual(levelOrder(buildTree([])), []);
assert.deepStrictEqual(levelOrder(buildTree([1,2,3,4])), [[1],[2,3],[4]]);

console.log('✅ 通過');
