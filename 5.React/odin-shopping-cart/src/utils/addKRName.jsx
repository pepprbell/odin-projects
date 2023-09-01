import nameData from '../assets/nameData'

export default function addKRName(res, category) {
  const dict = nameData[category]

  const newRes = new Array(...res)
  res.forEach((each, idx) => {
    const newItem = newRes[idx]
    const newName = dict[each.name.toLowerCase()]
    if (!newName) {
      console.log(each.name)
    }
    newItem['nameKR'] = dict[each.name.toLowerCase()]
    newItem['category'] = category
    newItem['categoryKR'] = nameData['category'][category]
    newRes[idx] = newItem
  })

  return newRes
}