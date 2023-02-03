function analyzeArray(array) {
  return {
    'average': array.reduce((prev, curr) => curr = prev + curr, 0)/array.length,
    'min': array.reduce((prev, curr) => curr = Math.min(curr, prev), array[0]),
    'max': array.reduce((prev, curr) => curr = Math.max(curr, prev), array[0]),
    'length': array.length
  }
}
module.exports = analyzeArray