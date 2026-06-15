/*
【題目】
LeetCode 226. Invert Binary Tree（翻轉二元樹）

敘述：
翻轉一棵二元樹（交換每個節點的左右子樹）並回傳根節點。

範例：
輸入: [4,2,7,1,3,6,9]
輸出: [4,7,2,9,6,3,1]
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

// 將二元樹序列化回層序陣列（去除尾端多餘 null）
function serialize(root){
  if(!root) return [];
  const out = [];
  const q = [root];
  while(q.length){
    const n = q.shift();
    if(n){ out.push(n.val); q.push(n.left); q.push(n.right); }
    else out.push(null);
  }
  while(out.length && out[out.length-1] === null) out.pop();
  return out;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root){
  // 遞迴：空節點直接回傳 null
  if(!root) return null;
  // 交換左右子樹，並對子樹遞迴翻轉
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}
// 時間複雜度 O(n)：每個節點走訪一次
// 空間複雜度 O(h)：遞迴堆疊深度為樹高 h

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(serialize(invertTree(buildTree([4,2,7,1,3,6,9]))), [4,7,2,9,6,3,1]);
assert.deepStrictEqual(serialize(invertTree(buildTree([2,1,3]))), [2,3,1]);
assert.deepStrictEqual(serialize(invertTree(buildTree([]))), []);
assert.deepStrictEqual(serialize(invertTree(buildTree([1]))), [1]);

console.log('✅ 通過');
