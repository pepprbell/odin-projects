function capitalize(str) {
  const isolated = str.split(' ')
  let res = ''

  isolated.forEach(word => {
    res += word[0].toUpperCase() + word.slice(1).toLowerCase() + ' '
  });

  return res
}

export default capitalize