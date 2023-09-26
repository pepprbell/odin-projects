
const useSort = (data, category, orderBy, dataHandler) => {
  const [storage, setStorage] = dataHandler
  const prev = storage.get(`${category}-${orderBy}`)
    
  const name = (a, b) => {
    return a.name.localeCompare(b.name)
  }
  
  const asc = (a, b) => {
    return parseInt(a.sell_nook) - parseInt(b.sell_nook)
  }
  
  const desc = (a, b) => {
    return parseInt(b.sell_nook) - parseInt(a.sell_nook)
  }

  const compareFn = {
    'default': name,
    'asc': asc,
    'desc': desc,
  }


  if (prev !== undefined) {
    return prev
  } else {
    const newData = [...data].sort(compareFn[orderBy])
    setStorage(prev => new Map([...prev, [`${category}-${orderBy}`, newData]]))
    return newData
  }
}

export default useSort