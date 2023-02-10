let game = Game()
let display = Display()
let input = Input()
game.isOn()

function Game() {
  let playerBoard = Gameboard()
  let aiBoard = Gameboard()
  let ai = Player(true)
  let on = false

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

  function handleShot(num) {
    // first shot이면 regenerate 버튼 없애기
    if (!on) {
      const button = document.querySelector('button')
      button.classList.add('hide')
      on = true
    }

    // ai board 타격체크
    let hasShip = shot(num, 1)
    display.shot(num, 1, hasShip)

    // 게임 끝났는지?
    if (aiBoard.isAllSunk()) {
      win(1)
    }

    // ai가 플레이어 타격
    let newShot = 'you'+ai.pick()
    shot(newShot, 2)
    display.shot(newShot, 2)

    // 게임 끝났는지?
    if (playerBoard.isAllSunk()) {
      win(2)
    }
  }

  function shot(id, player) {
    let n = id.substring(3)
    if (player == 1) {
      const hasShip = aiBoard.receiveAttack([Math.floor(n/10),n%10])
      if (hasShip) {
        return true
      }
    } else {
      playerBoard.receiveAttack([Math.floor(n/10),n%10])
    }
    return false
  }

  function win(player) {
    const h1 = document.querySelector('h1')
    if (player == 1) {
      h1.innerHTML = '🎉Player WIN🎉'
    } else {
      h1.innerHTML = '😥Player lose😥'
    }

    display.result()
  }

  function reset() {
    playerBoard = Gameboard()
    aiBoard = Gameboard()
    ai = Player()
    isOn()

    display.result()
  }

  function getAi() { return ai }

  return { isOn, resetBoard, placeShip, shot, getAi, handleShot, reset }
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

        if (player == 2) {
          div.addEventListener('click', input.shot)
          div.id = 'ene'+(i*10+j)
        } else {
          div.id = 'you'+(i*10+j)
          if (data[i][j] != 0) {
            div.classList.add('ship')
          }
        }
        board.appendChild(div)
      }
    }
  }

  function shot(id, hasShip = false) {
    const gotShot = document.querySelector(`#${id}`)
    gotShot.classList.add('shot')
    if (hasShip) {
      gotShot.classList.add('ship')
    }
  }

  function result() {
    const win = document.querySelector('#win')
    win.classList.toggle('hide')
    
    const regenerate = document.querySelector('#regenerate')
    regenerate.classList.remove('hide')
  }

  return { fillGrid, shot, result }
}

function Input() {

  function isOn() {
    const regenerate = document.querySelector('#regenerate')
    regenerate.addEventListener('click', () => game.resetBoard(1))

    const restart = document.querySelector('#restart')
    restart.addEventListener('click', game.reset)
  }

  function shot(e) {
    if ([...e.target.classList].includes('shot')) { return }
    game.handleShot(e.target.id)
  }

  return { isOn, shot }
}