// todo:
// remove, isbalanced, rebalance, height, depth


const node = (data=null, left=null, right=null) => {
  return {data, left, right}
}

const tree = (array) => {
  // remove duplicates, sort
  let arr = [...new Set(array)].sort((a,b) => a - b)
  let root = buildTree(arr)

  prettyPrint(root)

  function buildTree(array) {
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
    const left = buildTree(array.slice(0,middle))
    // Get the middle of the right half and make it the right child of the root created in step 1.
    const right = buildTree(array.slice(middle+1))
    root = node(data, left, right)
    return node(data, left, right)
  }

  function getRoot() { return root }

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

  function levelOrder(func = (value) => {return value}) {
    // func(node) results in bfs order
    // iteration / recursion available
    let res = []
    if (func === undefined) {
      func = (value) => {return value}
    }

    let nodes = [root]
    while (nodes.length > 0) {
      let thisNode = nodes.shift()
      res.push(func(thisNode.data))

      if (thisNode.left !== null) {
        nodes.push(thisNode.left)
      }
      if (thisNode.right !== null) {
        nodes.push(thisNode.right)
      }
    }

    return res // array of values if no function is given
  }

  function inorder(func = (value) => {return value}) {
    // same as levelOrder, but in dfs and inorder
    let res = []
    let stack = [root]
    let pool = new Set()

    while (stack.length > 0) {
      let thisNode = stack[stack.length-1]
      let newLeft = thisNode.left !== null && !(pool.has(thisNode.left.data))
      let newRight = thisNode.right !== null && !(thisNode.right.data in pool)

      if (newLeft) {
        // push into stack if left exists - no use for now
        stack.push(thisNode.left)
        continue
      } else if (newRight) {
        // pop if right exists, and push right into stack
        res.push(func(thisNode.data))
        pool.add(thisNode.data)
        stack.pop()
        stack.push(thisNode.right)
        continue
      } else {
        // pop if there's no left or right
        res.push(func(thisNode.data))
        pool.add(thisNode.data)
        stack.pop()
      }
    }
    return res
  }

  function preorder(func = (value) => {return value}, node = root) {
    let res = [func(node.data)]
    
    if (node.left !== null) {
      res = res.concat(preorder(func, node.left))
    }
    if (node.right !== null) {
      res = res.concat(preorder(func, node.right))
    }

    return res
  }

  function postorder(func = (value) => {return value}, node = root) {
    let res = []
    
    if (node.left !== null) {
      res = res.concat(postorder(func, node.left))
    }
    if (node.right !== null) {
      res = res.concat(postorder(func, node.right))
    }
    res.push(func(node.data))

    return res
  }

  function height(node) {
    let heightLeft = 0
    let heightRight = 0

    if (node.left !== null) {
      heightLeft = height(node.left) + 1
    }
    if (node.right !== null) {
      heightRight = height(node.right) + 1
    }

    return Math.max(heightLeft, heightRight) // node's height
  }

  function depth(node) {
    let thisNode = root
    let count = 0

    while (thisNode != node) {
      if (thisNode.data > node.data) {
        thisNode = thisNode.left
      } else {
        thisNode = thisNode.right
      }
      count ++
    }
    return count // node's depth
  }

  function isBalanced() {
    // check if the tree is balanced
    // balanced tree -> diff btwn heights of left & right nodes is not more than 1
    let left = root.left !== null ? height(root.left) : -1
    let right = root.right !== null ? height(root.right) : -1
    return Math.abs(left - right) <= 1
  }

  function rebalance() {
    // rebalances an unbalanced tree
    // use traversal method to provide a new array to buildTree function
    let array = inorder()
    buildTree(array)
  }

  return { getRoot, insert, remove, find, levelOrder, inorder, 
           preorder, postorder, height, depth, isBalanced, rebalance }
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