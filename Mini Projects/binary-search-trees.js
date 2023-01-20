
const node = (data=null, left=null, right=null) => {
  return {data, left, right}
}

const tree = (array) => {
  let tree = buildTree()
  return
}

const buildTree = (array) => {

  return // level 0 root node
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