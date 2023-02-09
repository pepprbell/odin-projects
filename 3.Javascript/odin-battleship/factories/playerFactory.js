function Player(ai = false) {
  const visited = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      visited.push([i,j])
    }
  }
  return {
    pick: function() {
      const nextCoord = visited.splice(Math.floor(Math.random()*visited.length), 1) 
      return nextCoord
    }
  }
}

// export default Player