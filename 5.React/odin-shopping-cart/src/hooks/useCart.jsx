const useCart = (cartHandler) => {
  const [cart, setCart] = cartHandler

  const updateItem = (item, newQuantity) => {

    const newCart = new Map(cart)
    newCart.set(item, newQuantity)

    setCart(newCart)
  }

  const addItem = (item) => {
    let count = cart.get(item) || 0

    if (count === 0) {
      alert('장바구니에 상품이 담겼습니다.')
    } else {
      alert(`한 번 더 담으셨네요!\n장바구니 수량이 ${count + 1}개가 되었습니다.`)
    }

    updateItem(item, count+1)
  }

  const deleteItem = (item) => {
    const newCart = new Map(cart)
    newCart.delete(item)

    setCart(newCart)
  }

  return { addItem, updateItem, deleteItem }
}

export default useCart