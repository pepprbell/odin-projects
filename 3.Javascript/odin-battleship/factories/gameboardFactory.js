import Ship from './shipFactory'

function Gameboard() {
  const gameboard = []
  const visited = []
  for (let i = 0; i < 10; i++) {
    gameboard.push([0,0,0,0,0,0,0,0,0,0])
    visited.push([0,0,0,0,0,0,0,0,0,0])
  }
  return {
    placeShip: function(coord, length, garo = true) {
      const dy = garo ? coord[0] : coord[0]+length
      const dx = garo ? coord[1]+length : coord[1]

      // coord 좌표 
      // 좌표 10 밖 or 길이 벗어나면 에러처리
      if (0 > coord[0] || 9 < coord[0] ||
          0 > coord[1] || 9 < coord[1] ||
          9 < dx || 9 < dy) {
          return false
      }

      // 배가 이미 있어도 에러처리
      if (garo) {
        for (let i = 0; i < length; i++) {
          if (gameboard[coord[0]][coord[1]+i] != 0) {
            return false
          }
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (gameboard[coord[0]+i][coord[1]] != 0) {
            return false
          }
        }
      }

      // 게임보드에 배 배치
      let ship = Ship(length)
      if (garo) {
        for (let i = 0; i < length; i++) {
          gameboard[coord[0]][coord[1]+i] = ship
        }
      } else {
        for (let i = 0; i < length; i++) {
          gameboard[coord[0]+i][coord[1]] = ship
        }
      }
      return true
    },
    receiveAttack: function(coord) {
      // 좌표를 받아 배가 맞았는지 아닌지 판별
      // 맞았으면 배한테 맞았다 표시
      // 쏜 자리 표시
    },
    isAllSunk: function() {
      // 모든 배가 침몰했는지 아닌지 return
    },
    showGameboard: function() { return gameboard },
    hasShip: function(coord) {
      // 해당 좌표에 배가 있는지 보고, 있다면 그 배를 return
      if (gameboard[coord[0]][coord[1]] == 0 ||
          gameboard[coord[0]][coord[1]] == 1) {
        return false
      } else {
        return gameboard[c[0]][c[1]]
      }
    }
  }
}

export default Gameboard