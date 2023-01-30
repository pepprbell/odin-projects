let arr = [];
for (let i = 1; i < 15; i++) {
  arr.push(i)  
}
console.log(`arr = [${arr}]`)
console.log(`tree`)
let thisTree = tree(arr)
console.log(`test find ->`, thisTree.find(3))


class Node
{
    constructor(d)
    {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}
 
let root = null;
 
/* A function that constructs Balanced Binary Search Tree 
 from a sorted array */
function sortedArrayToBST(arr, start, end)
{
    /* Base Case */
    if (start > end)
    {
        return null;
    }
    /* Get the middle element and make it root */
    var mid = parseInt((start + end) / 2);
    var node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it
     left child of root */
    node.left = sortedArrayToBST(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it
     right child of root */
    node.right = sortedArrayToBST(arr, mid + 1, end);
    return node;
}
 
 
var n = arr.length;
root = sortedArrayToBST(arr, 0, n - 1);
console.log('ex')
prettyPrint(root)