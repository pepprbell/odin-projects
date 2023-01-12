const button = document.querySelector('button')
const password = document.querySelector('#password')
const form = document.querySelector('form')

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
    form.reset()
    alert('submitted')
  } else {
    console.log('error')
  }
}

function isRequired(target) {
  if (target.value) {
    return true
  }
  target.setCustomValidity(`This input must be filled`)
  return false
}

function isRegular(target) {
  let re = /\w/g
  switch (target.id) {
    case 'email':
      re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      target.setCustomValidity(`Invalid email`)
      break;
    case 'password':
      re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      target.setCustomValidity(`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 8 characters.`)
      break;
    case 'zip':
      re = /\d{5}/g
      target.setCustomValidity(`Zip code contains five digits`)
      break;
  }
  if (re.test(target.value)) {
    target.setCustomValidity('')
    return true
  }
  return false
}

function isSame(target) {
  if (target.id != 'passConfirm') { return true }
  if (target.value == password.value) {
    return true
  }
  target.setCustomValidity(`Password doesn't match password confirmation`)
}