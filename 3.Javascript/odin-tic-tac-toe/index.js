const box = document.querySelector('.box')
const cells = [...document.querySelectorAll('.box > div')]
const players = [document.querySelector('.o'), document.querySelector('.x')]
const buttons = [...document.querySelectorAll('button')]
const modal = document.querySelector('.modal')

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
  const check = (id, marker) => {
    const garo = cells.filter(cell => Math.floor((cell.id-1) / 3) == Math.floor((id-1) / 3))
    const sero = cells.filter(cell => cell.id % 3 == id % 3)
    const x1 = [cells[0], cells[4], cells[8]]
    const x2 = [cells[2], cells[4], cells[6]]
  
    return [garo, sero, x1, x2].filter(list => search(list, marker))
  }
  const search = (list, marker) => {
    return list.every(cell => {
      return cell.innerHTML == marker
    })
  }
  const reset = () => {
    cells.forEach(cell => cell.addEventListener('click', gameFlow))
    board = [0,0,0,0,0,0,0,0,0]
    activeUser = player1
    cells.forEach(cell => {
      cell.classList = ''
      cell.innerHTML = ''
    });
    modal.classList.remove('modal-on')
  }
  const block = () => {
    cells.forEach(cell => cell.removeEventListener('click', gameFlow))
  }
  return { update, check, reset, block }
})

const displayController = (() => {
  const update = (id, user) => {
    cells[id-1].innerHTML = user.marker
    cells[id-1].style.color = user.color
  }
  const changeTurn = () => {
    activeUser = activeUser == player1 ? player2 : player1
    players.forEach(player => player.classList.toggle('on'))
  }
  const match = (list) => {
    list.forEach(cells => cells.forEach(cell => cell.classList.add('match')))
  }
  const alert = (user, state) => {
    updateBoard.block()
    const p = modal.childNodes[0]
    switch (state) {
      case 'win':
        p.innerHTML = `${user.number}P Win!`
        break;
      case 'draw':
        p.innerHTML = `Draw!`
        break;
    }
    modal.classList.add('modal-on')
  }
  return { update, changeTurn, match, alert }
})

const gameFlow = ((e) => {
  if (e.target.innerHTML != '') {
    return
  }

  updateBoard.update(e.target, activeUser)
  updateDisplay.update(e.target.id, activeUser)

  const checked = updateBoard.check(e.target.id, activeUser.marker)

  if (checked.length) {
    updateDisplay.match(checked)
    updateDisplay.alert(activeUser, 'win')
  } else if (board.indexOf(0) == -1) {
    updateDisplay.alert(activeUser, 'draw')
  }

  updateDisplay.changeTurn()
  return
})

const updateBoard = gameBoard()
const updateDisplay = displayController()
cells.forEach(cell => cell.addEventListener('click', gameFlow))
buttons.forEach(button => button.addEventListener('click', updateBoard.reset))