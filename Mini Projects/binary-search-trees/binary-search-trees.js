
const node = (data=null, left=null, right=null) => {
  return {data, left, right}
}

const tree = (array) => {
  // remove duplicates, sort
  let arr = [...new Set(array)].sort((a,b) => a - b)
  let root = buildTree(arr)

  prettyPrint(root)

  function buildTree(array) {
    // console.log(array)
    if (array.length == 0) {
      return null
    }
    if (array.length == 1) {
      return node(array[0])
    }
    // Set The middle element of the array as root.
    const middle = Math.floor((array.length) / 2)
    const data = array[middle]
    // Recursively do the same for the left half and right half.
    // Get the middle of the left half and make it the left child of the root created in step 1.
    // console.log(`root = ${data}, left, ${array.slice(0,middle)}`)
    const left = buildTree(array.slice(0,middle))
    // Get the middle of the right half and make it the right child of the root created in step 1.
    // console.log(`root = ${data}, right, ${array.slice(middle+1)}`)
    const right = buildTree(array.slice(middle+1))
    return node(data, left, right)
  }

  function insert(value) {
    if (!root) {
      root = node(value)
      return
    }

    if (find(value)) {
      return
    }

    let here = root
    while (true) {
      if (here.data > value) {
        if (here.left == null) {
          here.left = node(value)
          break
        }
        here = here.left
      } else {
        if (here.right == null) {
          here.right = node(value)
          break
        }
        here = here.right
      }
    }
  }

  function remove(value) {
    // value to delete
  }

  function find(value) {
    let here = root
    while (true) { 
      if (here === null) {
        return false
      }

      if (here.data == value) {
        return here

      } else if (here.data > value) {
        here = here.left

      } else if (here.data < value) {
        here = here.right
      }
    }
  }

  function levelOrder(func) {
    // func(node) results in bfs order
    // iteration / recursion available

    return // array of values if no function is given
  }

  function inorder(func) {
    // same as levelOrder, but in dfs and inorder
  }

  function preorder(func) {}

  function postorder(func) {}

  function height(node) {
    return // node's height
  }

  function depth(node) {
    return // node's depth
  }

  function isBalanced() {
    // check if the tree is balanced
    // balanced tree -> diff btwn heights of left & right nodes is not more than 1
  }

  function rebalance() {
    // rebalances an unbalanced tree
    // use traversal method to provide a new array to buildTree function
  }

  return { root, insert, remove, find, levelOrder, inorder, preorder,
           postorder, height, depth, isBalanced, rebalance }
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}