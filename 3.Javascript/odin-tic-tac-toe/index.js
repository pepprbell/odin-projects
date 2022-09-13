const box = document.querySelector('.box')
const cells = [...document.querySelectorAll('.box > div')]
const players = [document.querySelector('.o'), document.querySelector('.x')]

const player = (n) => {
  const number = n
  const marker = n == 1 ? 'O' : '⨉'
  const color = n == 1 ? '#00c3e3' : '#ff4554'
  return { number, marker, color }
}

let board = [0,0,0,0,0,0,0,0,0]
let player1 = player(1)
let player2 = player(2)
let activeUser = player1

const gameBoard = (() => {
  const update = (div, user) => {
    board[div.id-1] = user.number
  }
  return { update }
})

const displayController = (() => {
  const update = (id, user) => {
    cells[id-1].innerHTML = user.marker
    cells[id-1].style.color = user.color
    changeTurn()
  }

  const changeTurn = () => {
    activeUser = activeUser == player1 ? player2 : player1
    players.forEach(player => player.classList.toggle('on'))
  }
  return { update }
})

const gameFlow = ((e) => {
  
  const updateBoard = gameBoard()
  const updateDisplay = displayController()

  if (e.target.innerHTML != '') {
    return
  }

  updateBoard.update(e.target, activeUser)
  updateDisplay.update(e.target.id, activeUser)

  return {}
})

cells.forEach(cell => cell.addEventListener('click', gameFlow))