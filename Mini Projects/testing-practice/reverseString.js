function reverseString(string) {
  let res = ''
  for (let i = 0; i < string.length; i++) {
    res += string[string.length-1-i]
  }
  return res
}
module.exports = reverseString