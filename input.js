window.addEventListener('keydown', handleInput)

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleInput))
const numButtons = [...buttons].filter(button => !button.innerHTML.match(/^[0-9.]+$/))
numButtons.forEach(numButton => numButton.classList.add('contrast'))

const curr = document.querySelector('h1[data-key=number]')
const equation = document.querySelector('p[data-key=equation]')

let reset = false

function handleInput(e) {
  let selectedButton;
  if (e.type === 'keydown') {
    selectedButton = document.querySelector(`button[data-key="${e.keyCode}"]`)
    if (!selectedButton) return
    selectedButton.classList.add('push')
    setTimeout(() => {
      selectedButton.classList.remove('push')
    }, 90);
    } else {
    selectedButton = this
    this.classList.add('push')
    setTimeout(() => {
      this.classList.remove('push')
    }, 90);
  }
  let input = selectedButton.innerHTML

  let number = curr.innerHTML
  let eq = equation.innerHTML

  if (input.match(/^[0-9]+$/)) {
    if (reset === true) {
      curr.innerHTML = '0'
      equation.innerHTML = ''
      reset = false
    }
    if (number === '0') {
      curr.innerHTML = input
    } else {
      curr.innerHTML += input
    }

  } else if (input === '=') {
    if (reset === true) {
      equation.innerHTML = number + ' '
      reset = false
    }

    if (eq !== '' && eq[eq.length-2].match(/^[0-9]+$/)) {
      let last = eq.trim().split(' ')
      equation.innerHTML += last.slice(last.length-2).join(' ') + ' '
    } else if (eq !== '') {
      equation.innerHTML += number + ' '
    }
    reset = true
    operate()

  } else {
    if (reset === true) {
      equation.innerHTML = ''
      reset = false
    }
    switch (input) {
      case 'C':
        curr.innerHTML = '0'
        equation.innerHTML = ''
        break;

      case '.':
        if (number.includes('.')) {
          break
        }
        curr.innerHTML += '.'
        break;

      case '↩':
        if (number && number !== '0') {
          curr.innerHTML = number.substring(0,number.length-1)
        }
        break;

      default:
        if (number) {
          if (number[number.length-1] === '.') {
            number += '0'
          }
          curr.innerHTML = '0'
          equation.innerHTML += number + ` ${input} `
        } else if (!number && eq) {
          equation.innerHTML = eq.substring(0, eq.length-2)
          equation.innerHTML += number + ` ${input} `
        } else {
          equation.innerHTML = `0 ${input} `
        }
        break
    }
  }
}