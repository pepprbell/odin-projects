import { useEffect, useRef } from 'react';
import './Card.css'

const Card = (res) => {
  const data = res.data

  const ref = useRef(0)

  useEffect(() => {
    ref.current = data.name + '_' + data.number
  }, [])

  const addToCart = () => {
    const id = ref.current

    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, '1')
      alert('장바구니에 상품이 담겼습니다.')
    } else {
      localStorage.setItem(id, parseInt(localStorage.getItem(id)) + 1)
      alert(`한 번 더 담으셨네요!\n장바구니 수량이 ${localStorage.getItem(id)}개가 되었습니다.`)
    }
  }

  return (
    <div className="card">
      <figure>
        {data['image_url'] != '' ? <img src={data['image_url']} alt=""  /> : <span className="material-symbols-outlined">image_not_supported</span> }
        <button onClick={addToCart}><span className="material-symbols-outlined">add_shopping_cart</span></button>
      </figure>
      <p>{data.name}</p>
      <p className="money"><b>{data.sell_nook}</b>벨</p>
    </div>
  );
};

export default Card;