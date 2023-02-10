// import Ship from './shipFactory'

function Gameboard() {
  const gameboard = []
  const visited = []
  const shipList = []
  for (let i = 0; i < 10; i++) {
    gameboard.push([0,0,0,0,0,0,0,0,0,0])
    visited.push([0,0,0,0,0,0,0,0,0,0])
  }

  function getShipArea(coord, length, garo) {
    const [x,y] = coord
    const res = []
    let xlim; let ylim
    if (!garo) {
      xlim = [Math.max(0,x-1), Math.min(x+length+1,10)]
      ylim = [Math.max(0,y-1), Math.min(y+2,10)]
    } else {
      xlim = [Math.max(0,x-1), Math.min(x+2,10)]
      ylim = [Math.max(0,y-1), Math.min(y+length+1,10)]
    }

    for (let i = xlim[0]; i < xlim[1]; i++) {
      for (let j = ylim[0]; j < ylim[1]; j++) {
        res.push([i,j])
      }
    }
    return res
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

      // 배가 이미 있어도 에러처리, 주변 1칸씩도 비어있는지 확인
      const shipArea = getShipArea(coord, length, garo)
      for (let i = 0; i < shipArea.length; i++) {
        let [x,y] = shipArea[i]
        if (gameboard[x][y] != 0) { return false }
      }

      // 게임보드에 배 배치
      let ship = Ship(length)
      shipList.push(ship)
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
      if (visited[coord[0]][coord[1]] != 0) {
        return false
      }
      // 쏜 자리 표시
      visited[coord[0]][coord[1]] = 1
      // 좌표를 받아 배가 맞았는지 아닌지 판별 -> 타격
      if (this.hasShip(coord)) {
        gameboard[coord[0]][coord[1]].hit()
        return true
      }
    },
    isAllSunk: function() {
      // 모든 배가 침몰했는지 아닌지 return
      return shipList.every(ship => ship.isSunk())
    },
    showGameboard: function() { return gameboard },
    hasShip: function(coord) {
      // 해당 좌표에 배가 있는지 보고, 있다면 그 배를 return
      if (gameboard[coord[0]][coord[1]] == 0 ||
          gameboard[coord[0]][coord[1]] == 1) {
        return false
      } else {
        return gameboard[coord[0]][coord[1]]
      }
    }
  }
}

// export default Gameboard