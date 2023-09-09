const useCart = (type, res, cartHandler, newQuantity=0) => {
  const [cart, setCart] = cartHandler

  const updateItem = (item, newQuantity) => {
    const newCart = new Map(cart)
    newCart.set(item, newQuantity)

    setCart(newCart)
  }

  const addItem = (item, newQuantity) => {
    const count = cart.get(item) || 0
    const add = newQuantity != 0 ? newQuantity : 1
    

    if (count === 0) {
      alert('장바구니에 상품이 담겼습니다.')
    } else {
      alert(`한 번 더 담으셨네요!\n장바구니 수량이 ${count + add}개가 되었습니다.`)
    }

    updateItem(item, count+add)
  }

  const deleteItem = (list) => {
    const newCart = new Map(cart)
    list.forEach(each => newCart.delete(each))

    setCart(newCart)
  }

  const cartFn = {
    'add': addItem,
    'update': updateItem,
    'delete': deleteItem,
  }

  if (type == 'update') {
    updateItem(res, newQuantity)
  } else {
    cartFn[type](res, newQuantity)
  }
}

export default useCart