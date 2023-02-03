function caesarCipher(string, gap) {
  const offset = gap % 26
  let res = ''
  for (let i = 0; i < string.length; i++) {
    let ascii = string.charCodeAt(i)
    if (isUpper(ascii) || isLower(ascii)) { // ABCD..
      if ((isUpper(ascii) && !isUpper(ascii + offset))
       || (isLower(ascii) && !isLower(ascii + offset))) {
        ascii = offset > 0 ? ascii - 26 : ascii + 26
      }
      ascii += offset
    }
    res += String.fromCharCode(ascii)
  }

  function isUpper(ascii) {
    if (65 <= ascii && ascii <= 90) {
      return true
    }
    return false
  }
  function isLower(ascii) {
    if (97 <= ascii && ascii <= 122) {
      return true
    }
    return false
  }

  return res
}
module.exports = caesarCipher