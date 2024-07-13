const Tree = require("./Tree")
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

console.log("Is the tree balanced?", tree.isBalanced())

prettyPrint(tree.root)

tree.insert(10)
tree.delete(67)

console.log("---------------------\n")

prettyPrint(tree.root)

// Print tree elements in different orders
console.log("Level Order:", tree.levelOrder())
console.log("Pre Order:", tree.preOrder())
console.log("Post Order:", tree.postOrder())
console.log("In Order:", tree.inOrder())

// Unbalance the tree
tree.insert(101)
tree.insert(102)
tree.insert(103)
tree.insert(104)
tree.insert(105)

console.log("Is the tree balanced after insertions?", tree.isBalanced())

tree.rebalance()

console.log("Is the tree balanced after rebalancing?", tree.isBalanced())

prettyPrint(tree.root)
