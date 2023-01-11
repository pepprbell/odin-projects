const button = document.querySelector('button')
const email = document.querySelector('#email')
const country = document.querySelector('#country')
const zip = document.querySelector('#zip')
const password = document.querySelector('#password')
const passConfirm = document.querySelector('#passConfirm')

const inputs = document.querySelectorAll('input')
const select = document.querySelector('select')

inputs.forEach(input => {
  input.addEventListener('focusout', e => validate(e.target))
});
select.addEventListener('focusout', e => validate(e.target))

button.addEventListener('click', handleSubmit)

function validate(target) {
  const filled = isRequired(target)
  const regular = isRegular(target)
  const confirm = isSame(target)
  if (filled && regular && confirm) {
    return true
  } else {
    return false
  }
}

function handleSubmit() {
  let submit = true
  inputs.forEach(input => {
    let validation = validate(input)
    if (!validation) {
      submit = false
    }
  })
  let validation = validate(select)
  if (submit && validation) {
    console.log('submitted')
  } else {
    console.log('error')
  }
}

function isRequired(target) {
  if (target.value) {
    return true
  }
  return false
}

function isRegular(target) {
  let re = /\w/g
  switch (target.id) {
    case 'email':
      re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      break;
    case 'password':
      re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      break;
    case 'zip':
      re = /\d{5}/g
      break;
  }
  if (re.test(target.value)) {
    return true
  }
  return false
}

function isSame(target) {
  if (target.id != 'passConfirm') { return true }
  if (target.value == password.value) {
    return true
  }
}