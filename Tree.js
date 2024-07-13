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

  find(value) {
    return this._findNode(this.root, value)
  }

  _findNode(root, value) {
    if (root === null || root.data === value) return root

    if (value < root.data) {
      return this._findNode(root.left, value)
    }
    return this._findNode(root.right, value)
  }

  // levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback.
  levelOrder(callback) {
    if (this.root === null) return []

    const queue = [this.root]
    const result = []

    // Loop until the queue is empty
    while (queue.length > 0) {
      // Dequeue a node from the front of the queue
      const node = queue.shift()

      // If a callback is provided, execute the callback with the current node
      if (callback) {
        callback(node)
      } else {
        // If no callback is provided, add the node's data to the result array
        result.push(node.data)
      }

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    return result
  }

  inOrder(callback) {
    const result = []
    this._inOrder(this.root, callback, result)
    return result
  }

  _inOrder(node, callback, result) {
    if (node !== null) {
      this._inOrder(node.left, callback, result)
      if (callback) {
        callback(node)
      } else {
        result.push(node.data)
      }
      this._inOrder(node.right, callback, result)
    }
  }

  preOrder(callback) {
    const result = []
    this._preOrder(this.root, callback, result)
    return result
  }

  _preOrder(node, callback, result) {
    if (node !== null) {
      if (callback) {
        callback(node)
      } else {
        result.push(node.data)
      }
      this._preOrder(node.left, callback, result)
      this._preOrder(node.right, callback, result)
    }
  }

  postOrder(callback) {
    const result = []
    this._postOrder(this.root, callback, result)
    return result
  }

  _postOrder(node, callback, result) {
    if (node !== null) {
      this._postOrder(node.left, callback, result)
      this._postOrder(node.right, callback, result)
      if (callback) {
        callback(node)
      } else {
        result.push(node.data)
      }
    }
  }

  height(node) {
    if (node === null) return -1
    return 1 + Math.max(this.height(node.left), this.height(node.right))
  }

  depth(node) {
    return this._depth(this.root, node, 0)
  }

  _depth(root, node, depth) {
    if (root === null) return -1
    if (root === node) return depth

    const left = this._depth(root.left, node, depth + 1)
    if (left !== -1) return left
    return this._depth(root.right, node, depth + 1)
  }

  isBalanced() {
    return this._isBalanced(this.root)
  }

  _isBalanced(node) {
    if (node === null) return true

    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)

    if (Math.abs(leftHeight - rightHeight) > 1) return false

    return this._isBalanced(node.left) && this._isBalanced(node.right)
  }

  rebalance() {
    const nodes = this.inOrder()
    this.root = this.buildTree(nodes)
  }
}

module.exports = Tree
