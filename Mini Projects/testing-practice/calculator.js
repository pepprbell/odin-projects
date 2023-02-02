const add = (a,b) => { return a+b }
const subtract = (a,b) => { return a-b }
const divide = (a,b) => { return b !== 0 ? a/b : null }
const multiply = (a,b) => { return a*b }

const calculator = { add, subtract, divide, multiply }
module.exports = calculator