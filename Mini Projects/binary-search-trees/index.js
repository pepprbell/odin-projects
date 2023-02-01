let arr = [];
// for (let i = 1; i < 12; i++) {
//   arr.push(i*10)  
// }
for (let i = 4; i < 15; i++) {
  arr.push(i)  
}
console.log(`arr = [${arr}]`)
console.log(`tree`)

// create tree
let thisTree = tree(arr)
console.log(`Is this tree balanced? `,thisTree.isBalanced())

// find one node, and check it's height and depth
let n = arr[Math.floor(Math.random()*arr.length)]
console.log(`find node ${n} ->`, thisTree.find(n))
let findNode = thisTree.find(n)
console.log(`node ${n}'s height ->`, thisTree.height(findNode))
console.log(`node ${n}'s depth ->`, thisTree.depth(findNode))

// Print out all elements in level, pre, post, and in order
console.log('level order:',thisTree.levelOrder())
console.log('preorder:', thisTree.preorder())
console.log('postorder:', thisTree.postorder())
console.log('inorder: ',thisTree.inorder())

console.log('------------------------')
// add some numbers
// for (let i = 1; i < 20; i++) {
//   thisTree.insert(Math.round(Math.random()*36))
// }
thisTree.insert(0)
thisTree.insert(1)
thisTree.insert(2)
thisTree.insert(3)
prettyPrint(thisTree.getRoot())

// Confirm that the tree is balanced
console.log(`Is this tree balanced? `, thisTree.isBalanced())
thisTree.rebalance()
console.log(`Rebalance succeded? `, thisTree.isBalanced())
prettyPrint(thisTree.getRoot())

let m = arr[Math.floor(Math.random()*arr.length)]

console.log('remove',m)
thisTree.remove(m)
prettyPrint(thisTree.getRoot())