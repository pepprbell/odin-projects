const linkedList = () => {
  let list = []

  const append = (value) => {
    list[-1].nextNode = value
    let newNode = node(value)
    list.push(newNode)
  }
  const prepend = (value) => {
    let newNode = node(value, list[0].value)
    list.unshift(newNode)
  }
  const size = list.length
  const head = list[0]
  const tail = list[list.length-1]
  const at = (index) => list[index]
  const pop = () => {
    list.pop()
    list[-1].nextNode = null 
  } 
  const contains = (value) => {
    return list.some(i => {
      return i.value == value
    })
  }
  const find = (value) => {
    return list.some()
  }
  const toString = () => {
    let res = ''
    for (let i = 0; i < list.length; i++) {
      res += `( ${list[i].value} ) ->`
    }
    res += 'null'
    console.log(res)
  }
  const insertAt = (value, index) => {
    list[index].nextNode = value
    list.splice(index, 0, value)
  }
  const removeAt = (index) => {
    if (index+1 == list.length) {
      list[index-1].nextNode = null
    } else {
      list[index-1].nextNode = list[index+1].value
    }
    list.splice(index, 1)
  }

  return { append, prepend, size, head, tail, at, pop,
           contains, find, toString, insertAt, removeAt }
}

const node = (value = null, nextNode = null) => {
  return {value, nextNode}
}