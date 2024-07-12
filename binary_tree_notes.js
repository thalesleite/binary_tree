// Binary Search
// * sorted list
// 0. repeat until the array is size of 0
// 1. calculate the middle point
// 2. if the target is at the middle, stop
// 3. otherwise, if the target is less than what's at the middle, repeat, changing the end point to be just to the left of the middle.
// 4. otherwise, if the target is greater than what's at the middle, repeat, changing the start point to be just to the right of the middle.
// Big O(log n)

// Stack -> LIFO last element in is the first to out
// Queue -> FIFO first element in is first out

// Binary Tree Traversal
// * unsorted list
// 1. Breadth-first search -> Level-order
// 2. Depth-first search
//    -> preorder - root, left, right
//    -> inorder - left, root, right
//    -> postorder - left, right, root

// Breadth-first search - Big O(n)
// queue(FIFO)

// Depth-first search
