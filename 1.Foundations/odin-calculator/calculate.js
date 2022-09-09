function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function calculate(postfix) {
  let stack = []
  let res = 0


  while (postfix.length >= 1) {
    let i = postfix[0]

    if (i[i.length-1].match(/^[0-9]+$/)) {
      stack.push(i)
    } else {
      let b =  Number.parseFloat(stack.pop())
      let a = Number.parseFloat(stack.pop())
      switch (i) {
        case '-':
          res = subtract(a,b)
          break;
        case '+':
          res = add(a,b)
          break;
        case '÷':
          res = divide(a,b)
          break;
        case '×':
          res = multiply(a,b)
          break;
      }
      stack.push(res)
    }
    postfix = postfix.splice(1)
  }

  res = String(stack[0])
  if (res.split('.').length > 1 && res.split('.')[1].length > 6) {
    stack[0] = Math.round(stack[0]*100000)/100000
  }

  return stack[0]
}