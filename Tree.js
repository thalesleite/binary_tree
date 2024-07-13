const Node = require("./Node")

class Tree {
  constructor(arr) {
    // Ensure the array is sorted and contains unique values
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b)
    this.root = this.buildTree(sortedArr)
  }

  // [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
  buildTree(arr) {
    if (arr.length === 0) return null

    const middle = Math.floor(arr.length / 2)
    const node = new Node(arr[middle])

    const left = arr.slice(0, middle)
    const right = arr.slice(middle + 1)

    node.left = this.buildTree(left)
    node.right = this.buildTree(right)

    return node
  }

  insert(value) {
    this.root = this._insertNode(this.root, value)
  }

  _insertNode(root, value) {
    if (root === null) return new Node(value)

    if (value < root.data) {
      root.left = this._insertNode(root.left, value)
    } else {
      root.right = this._insertNode(root.right, value)
    }

    return root
  }

  delete(value) {
    // Given a binary search tree and a key, this function deletes the key and returns the new root
    this.root = this._deleteNode(this.root, value)
  }

  _deleteNode(root, value) {
    // Base case
    if (root === null) return root

    // If the value to be deleted is smaller than the root's data, then it lies in the left subtree
    if (value < root.data) {
      root.left = this._deleteNode(root.left, value)
      // If the value to be deleted is greater than the root's data, then it lies in the right subtree
    } else if (value > root.data) {
      root.right = this._deleteNode(root.right, value)
      // If value is same as root's data, then this is the node to be deleted
    } else {
      // Node with only one child or no child
      if (root.left === null) return root.right
      if (root.right === null) return root.left

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      root.data = this._minValueNode(root.right)
      // Delete the inorder successor
      root.right = this._deleteNode(root.right, root.data)
    }

    return root
  }

  _minValueNode(node) {
    let current = node
    while (current.left !== null) {
      current = current.left
    }
    return current.data
  }
}

module.exports = Tree
