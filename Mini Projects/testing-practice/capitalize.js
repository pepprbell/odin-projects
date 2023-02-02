function capitalize(string) {
  let str = string.trim()
  return str[0].toUpperCase() + str.slice(1)
}
module.exports = capitalize