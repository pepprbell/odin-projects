let gameboard = []
for (let i = 0; i < 8; i++) {
  gameboard.push([-1,-1,-1,-1,-1,-1,-1,-1])  
}

const move = [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]

const node = (point, count, array = []) => {
  return {point, count, array}
}

function knightMoves(start, end) {
  gameboard[start[0]][start[1]] = 0

  q = new deque()
  q.append(node(start, 0))

  let count = 0

  while (q.length() && count < 3000) {
    count ++
    let here = q.popleft()
    if (here.point[0] == end[0] && here.point[1] == end[1]) {
      print()
      return
    }

    move.forEach(each => {
      let dx = here.point[0]+each[0]
      let dy = here.point[1]+each[1]
      if (!(0 <= dx && dx < 8 && 0 <= dy && dy < 8)) { return }
      if (check([dx,dy])) { return }

      const next = node([dx,dy], here.count+1)
      gameboard[dx][dy] = here.point
      q.append(next)
    })

  }

  function check(point) { 
    // check gameboard coord and return if there's number in that point
    return gameboard[point[0]][point[1]] != -1 // return true if visited
  }

  function print(point = end) {
    let res = [end]
    while (point[0] != start[0] || point[1] != start[1]) {
      res.push(gameboard[point[0]][point[1]])
      point = gameboard[point[0]][point[1]]
    }
    console.log(`You made it in ${res.length-1} moves!  Here's your path:`)
    while (res.length) {
      console.log(res.pop())
    }
  }
}

function deque(elements = {}, head = 0, tail = 0) {
  const append = (element) => {
    elements[tail] = element
    tail++
  }
  const popleft = () => {
    const item = elements[head]
    delete elements[head]
    head++
    return item
  }
  const peek = () => {
    return elements[head]
  }
  const length = () => {
    return tail - head
  }
  const isEmpty = () => {
    return length === 0
  }

  return {append, popleft, peek, length, isEmpty}
}