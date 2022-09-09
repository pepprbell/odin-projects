const button = document.querySelector('.submit')
button.addEventListener('click', submit)

const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const phoneNumber = document.querySelector('#phone-number')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirm-password')

const inputs = [...document.querySelectorAll('input')]
inputs.map(input => input.addEventListener('focusout', isValid))


function submit() {
  const isEvery = inputs.every(input => isValid({target: input}))
  if (isEvery) {
    alert(`Welcome, ${inputs[0].value} ${inputs[1].value}!`)
  }
}

function isValid(e) {

  if (isBlank(e.target)) {
    writeMessage(e.target)
    e.target.addEventListener('keyup', checkBlank)
    return false
  }

  switch (e.target.id) {
    case 'first-name':
    case 'last-name':
      return true
      break;

    case 'email':
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        return true
      }
      break

    case 'phone-number':
      if (e.target.value.match( /^[0-9]{11}$/ )) {
        return true
      }
      break

    case 'password':
    case 'confirm-password':
      if (password.value === confirmPassword.value && !isBlank(password) && !isBlank(confirmPassword)) {
        return true
      }
      break;
  }

  writeMessage(e.target)
  e.target.addEventListener('keyup', check)
  return false
}

function writeMessage(input) {

  let parent;
  const message = document.createElement('p')

  if (input.id.includes('password')) {
    removeWarning(password)
    removeWarning(confirmPassword)

    parent = document.querySelector(`.password`)
    if (!isBlank(password) && !isBlank(confirmPassword)) {
      message.innerHTML = `⛔ The password and confirm password should be the same.`
      password.classList.add('invalid')
      confirmPassword.classList.add('invalid')
    }
  } else {
    removeWarning(input)

    parent = document.querySelector(`.${input.id}`)
    message.innerHTML = `⛔ Please enter your ${input.id.replace('-', ' ')}`
    input.classList.add('invalid')
  }

  parent.appendChild(message)
}

function check(e) {
  if (e.target.id.includes('password')) {
    removeWarning(password)
    removeWarning(confirmPassword)
  } else {
    removeWarning(e.target)
  }

  isValid(e)

  if (e.target !== document.activeElement) {
    e.target.removeEventListener('keyup',check)
    e.target.removeEventListener('focusout',check)
  }
}

function checkBlank(e) {
  removeWarning(e.target)

  if (e.target.value.trim() === '') {
    writeMessage(e.target)
  } else {
    e.target.removeEventListener('keyup',checkBlank)
  }
}

function removeWarning(target) {
  target.classList.remove('invalid')

  const parent = document.querySelector(`.${target.id}`)

  while (parent.childNodes.length > 5) {
    parent.removeChild(parent.lastChild)
  }
}

function isBlank(target) {
  if (target.value.trim() === '') {
    return true
  }
  return false
}