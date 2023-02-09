let game = Game()
let display = Display()
let input = Input()
game.isOn()

function Game() {
  let playerBoard = Gameboard()
  let aiBoard = Gameboard()
  const player = Player()
  const ai = Player(true)

  function isOn() {
    placeShip(playerBoard, 1)
    placeShip(aiBoard, 2)
    input.isOn()
  }

  function resetBoard(player) {
    const newBoard = Gameboard()
    placeShip(newBoard, player)
    if (player == 1) {
      playerBoard = newBoard
    } else {
      aiBoard = newBoard
    }
  }

  function placeShip(board, player) {
    const ships = { // size : count
      4: 1,
      3: 2,
      2: 3,
      1: 3
    }

    for (let i = 1; i <= 4; i++) {
      let isPlaced = 0
      while (isPlaced < ships[i]) {
        const coord = [Math.floor(Math.random()*10),Math.floor(Math.random()*10)]
        const garo = Boolean(Math.round(Math.random()))
        isPlaced += board.placeShip(coord, i, garo)
      }
    }
    display.fillGrid(board.showGameboard(), player)
  }

  function shot(num, player) {
    if (player == 1) {
      aiBoard.receiveAttack([Math.floor(num/10),num%10])
    } else {
      playerBoard.receiveAttack([Math.floor(num/10),num%10])
    }
  }

  function getAi() { return ai }

  return { isOn, resetBoard, placeShip, shot, getAi }
}

function Display() {

  function fillGrid(data, player) {
    const board = player == 1 ? document.querySelector('#your_board') : document.querySelector('#enemy_board')
    while (board.hasChildNodes()) {
      board.removeChild(board.firstChild)
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let div = document.createElement('div')
        div.name = i*10+j
        if (data[i][j] != 0) {
          div.classList.add('ship')
        }
        if (player == 2) {
          div.addEventListener('click', input.shot)
        }
        board.appendChild(div)
      }
    }
  }

  function shot(num, player) {
    const gotShot = player == 1 ?
      document.querySelector(`div#enemy_board div[name='${num}']`) :
      document.querySelector(`div#your_board div[name='${num}']`)
    console.log(num, player, gotShot)
    console.log(document.querySelector("div[name='1']"))
    
  }

  return { fillGrid, shot }
}

function Input() {

  function isOn() {
    const button = document.querySelector('button')
    button.addEventListener('click', () => game.resetBoard(1))
  }

  function shot(e) {
    console.log(e.target.name)
    // ai board 타격체크
    game.shot(e.target.name, 1)
    display.shot(e.target.name, 1)
    // ai가 플레이어 타격
    let newShot = game.getAi().pick()
    game.shot(newShot, 2)
    display.shot(newShot, 2)
  }

  return { isOn, shot }
}