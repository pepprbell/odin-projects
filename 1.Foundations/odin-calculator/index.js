let priority = {'+':1, '-':1, '×':2, '÷':2}

function operate() {
  let infix = document.querySelector('p[data-key=equation]').innerHTML.trim().split(' ')
  let postfix = convertInfix(infix)


  if (infix.length === 1) {
    return
  }

  let res = calculate(postfix)
  curr.innerHTML = res
}

function convertInfix(infix) {
  let stack = []
  let postfix = []

  for (let x = 0; x < infix.length; x++) {
    let i = infix[x]
    if (i[0].match(/^[0-9]+$/)) {
      postfix.push(i)
      continue
    }
    while (stack.length >= 1) {
      let last = stack[stack.length-1]
      if (priority[last] < priority[i]) {
        break
      }
      postfix.push(stack.pop())
    }
    stack.push(i)        
  }
  while (stack.length >= 1) {
    postfix.push(stack.pop())
  }

  return postfix
}