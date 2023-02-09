function Game() {
  const playerBoard = Gameboard()
  const aiBoard = Gameboard()
  const player = Player()
  const ai = Player(true)

  function isOn() {
    placeShip(playerBoard)
    placeShip(aiBoard)
    console.table(playerBoard.showGameboard())
    console.table(aiBoard.showGameboard())
  }

  function placeShip(board) {
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
  }

  return { isOn }
}

let game = Game()
game.isOn()