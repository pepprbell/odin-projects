const container = document.querySelector('.container')

createCell(4)

const button = document.querySelector('button')
button.addEventListener('click', setGrid)

function setGrid() {
  let n;
  while (1) {
    n = prompt('How many squares per side? (max size = 100)')
    if (n.match(/^[0-9]+$/) && 0 < n && n <= 100) {
      break
    }
  }
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild)
  }
  document.documentElement.style.setProperty('--box-size',(800/n) + 'px')
  createCell(n)
}

function createCell(n) {
  for (let i = 0; i < n**2; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    container.appendChild(cell)
  }

  const cells = document.querySelectorAll('.cell')
  cells.forEach(cell => cell.addEventListener('mouseenter', hover))
}

function hover(e) {
  let cell = e.target
  let bg = cell.style.backgroundColor
  switch (bg) {
    case 'var(--one)':
      cell.style.backgroundColor = 'var(--two)'
      break;

    case 'var(--two)':
      cell.style.backgroundColor = 'var(--three)'
      break;
    
    case 'var(--three)':
      cell.style.backgroundColor = 'var(--four)'
      break;

    case 'var(--four)':
      cell.style.backgroundColor = 'var(--five)'
      break;

    case 'var(--five)':
      break;

    default:
      cell.style.backgroundColor = 'var(--one)'
      break;
  }
}