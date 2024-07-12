const Node = require("./Node")

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
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
}

module.exports = Tree
