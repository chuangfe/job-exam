/*
【題目】二元搜尋樹 (Binary Search Tree, BST)

請實作一棵二元搜尋樹，支援以下操作：
  - insert(value)：插入節點
  - search(value)：搜尋值是否存在，回傳 true / false
  - preOrder()：前序走訪（根 → 左 → 右），回傳值的陣列
  - inOrder()：中序走訪（左 → 根 → 右），回傳值的陣列
  - postOrder()：後序走訪（左 → 右 → 根），回傳值的陣列

【範例】
  const bst = new BST();
  [8, 3, 10, 1, 6, 14, 4, 7].forEach(v => bst.insert(v));
  bst.search(6);      // true
  bst.search(99);     // false
  bst.inOrder();      // [1, 3, 4, 6, 7, 8, 10, 14]  （遞增排序）
*/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node; // 空樹，新節點即為根
      return;
    }
    let curr = this.root;
    while (true) {
      if (value < curr.value) {
        // 比目前節點小，往左
        if (!curr.left) {
          curr.left = node;
          return;
        }
        curr = curr.left;
      } else {
        // 大於等於目前節點，往右
        if (!curr.right) {
          curr.right = node;
          return;
        }
        curr = curr.right;
      }
    }
  }

  search(value) {
    let curr = this.root;
    while (curr) {
      if (value === curr.value) return true; // 找到
      // 比大小決定往左或往右
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false; // 走到 null 仍找不到
  }

  preOrder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);             // 先訪根
    this.preOrder(node.left, result);    // 再訪左
    this.preOrder(node.right, result);   // 最後訪右
    return result;
  }

  inOrder(node = this.root, result = []) {
    if (!node) return result;
    this.inOrder(node.left, result);     // 先訪左
    result.push(node.value);             // 再訪根
    this.inOrder(node.right, result);    // 最後訪右
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (!node) return result;
    this.postOrder(node.left, result);   // 先訪左
    this.postOrder(node.right, result);  // 再訪右
    result.push(node.value);             // 最後訪根
    return result;
  }
}

/*
複雜度說明：
  insert / search 平均為 O(log n)，最壞為 O(n)（資料有序插入時退化成鏈狀）。
  三種走訪皆需訪遍每個節點，為 O(n)；遞迴呼叫堆疊空間 O(h)，h 為樹高。

重點：三種走訪差別僅在「訪根的時機」——
      前序在進入左右子樹前訪根、中序在左右之間訪根、後序在左右之後訪根。
      中序走訪 BST 會得到遞增排序結果，是必背考點。
*/

// ===== 測試 =====
const assert = require('node:assert');

const bst = new BST();
[8, 3, 10, 1, 6, 14, 4, 7].forEach((v) => bst.insert(v));

assert.strictEqual(bst.search(6), true);
assert.strictEqual(bst.search(99), false);

assert.deepStrictEqual(bst.preOrder(), [8, 3, 1, 6, 4, 7, 10, 14]);
assert.deepStrictEqual(bst.inOrder(), [1, 3, 4, 6, 7, 8, 10, 14]);
assert.deepStrictEqual(bst.postOrder(), [1, 4, 7, 6, 3, 14, 10, 8]);

console.log('✅ 通過');
