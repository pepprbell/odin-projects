const buttons = [...document.querySelectorAll('button:not(.submit)')]
const submitButton = document.querySelector('.submit')

submitButton.addEventListener('click', addBookToLibrary)

let myLibrary = []

function Book(title, author, read) {
  this.title = title
  this.author = author
  this.read = read
}

function addBookToLibrary(e) {
  let inputs = [...e.target.parentNode.childNodes].filter(input => input.nodeName === 'INPUT')

  let container = document.querySelector('.container')
  let card = document.createElement('div')
  card.classList = 'card'

  if (inputs[0].value === '' || inputs[1].value === '') {
    return
  }

  let title = document.createElement('h4')
  title.innerHTML = inputs[0].value

  let line = document.createElement('div')
  let author = document.createElement('p')
  author.innerHTML = inputs[1].value

  let button = document.createElement('button')
  button.addEventListener('click', readBook)
  button.classList = 'submit'
  button.innerHTML = '✔'

  card.appendChild(title)
  card.appendChild(line)
  card.appendChild(author)
  card.appendChild(button)
  container.appendChild(card)
}

function readBook(e) {
  let texts = [...e.target.parentNode.childNodes].filter(input => input.nodeName === 'H4' || input.nodeName === 'P')
  texts.forEach(text => text.classList.toggle('read'))
  e.target.parentNode.classList.toggle('read')
}