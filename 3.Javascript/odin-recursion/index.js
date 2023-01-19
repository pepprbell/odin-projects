const fib = document.querySelector('input[name=fibs]')
const fibRec = document.querySelector('input[name=fibsRec]')
const merge = document.querySelector('input[name=mergeSort]')

fib.addEventListener('change', e => {
  let res = fibs(e.target.value)
  console.log(res)
})
fibRec.addEventListener('change', e => {
  let res = fibsRec(e.target.value)
  console.log(res)
})
merge.addEventListener('change', e => {
  let res = mergeSort([40, 100, 1, 5, 25, 10, 2, 3])
  console.log(res)
})

function fibs(n) {
  let res = [0,1]
  if (n == 1) {
    console.log([0])
    return
  }
  while (res.length != n) {
    res.push(res[res.length-2] + res[res.length-1])
  }
  
  return res
}

function fibsRec(n) {
  if (n == 1) {
    return [0]
  }
  if (n == 2) {
    return [0,1]
  }
  let last = fibsRec(n-1)
  last.push(last[last.length-2] + last[last.length-1])
  return last
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let left = mergeSort(arr.slice(0,arr.length/2))
  let right = mergeSort(arr.slice(arr.length/2))

  let res = []
  while (left.length >= 1 && right.length >= 1) {
    if (left === []) {
      res.push(right.shift())
      continue
    } else if (right === []) {
      res.push(left.shift())
      continue
    }

    if (right[0] <= left[0]) {
      res.push(right.shift())
    } else {
      res.push(left.shift())
    }
  }
  res = res.concat(left,right)
  return res
}