function Ship(length) {
  let hits = 0
  return {
    length,
    count: function() { return hits },
    hit: function() { hits ++ },
    isSunk: function() {
      if (length <= hits) {
        return true
      } else {
        return false
      }
    }
  }
}

export default Ship