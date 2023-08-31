import nameData from '../assets/nameData'

export default function addKRName(res, category) {
  const dict = nameData[category]

  const newRes = new Array(...res)
  console.log(res)
  res.forEach((each, idx) => {
    const newItem = newRes[idx]
    newItem['nameKR'] = dict[each.name.toLowerCase()]
    newRes[idx] = newItem
  })
  console.log(newRes)

  return newRes
}