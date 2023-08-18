import { useEffect, useRef, useState } from 'react';
import './CartObject.css'
import useCart from '../hooks/useCart';

const CartObject = ({ data, oncheck, checkRef, cartHandler }) => {
  const [num, setNum] = useState(1)
  const [totalCost, setTotalCost] = useState(1)
  const defaultCost = data[0].sell_nook
  const [cart, setCart] = cartHandler

  const inputRef = useRef(null)

  useEffect(() => {
    let n = parseInt(data[1])
    setNum(n)
    inputRef.current.value = n
  }, [])

  useEffect(() => {
    setTotalCost(num*defaultCost)
    // useCart(cartHandler).updateItem(data, num)
  }, [num])

  const handleCheck = () => {}

  const handleInput = (e) => {
    if (e.target.value === '') {
      setNum(1)
      setTotalCost(defaultCost)
    }
    const n = parseInt(e.target.value)
    console.log(n)
    if (n > 99) {
      alert('최대 구매 가능 개수는 99개입니다.')
      setNum(99)
    } else if (n <= 0) {
      setNum(0)
    } else {
      setNum(n)
    }
  }

  const handlePlus = () => {
    if (num < 99) {
      setNum(num+1)
    } else {
      alert('최대 구매 가능 개수는 99개입니다.')
      setNum(99)
    }
  }
  const handleMinus = () => {
    if (num > 1) {
      setNum(num-1)
    }
  }

  return (
    <menu className="cartObject">
      <li className="cartDesc">
        <label className='checkbox'>
          <input type="checkbox" name="" id="" onChange={handleCheck} ref={checkRef} />
          <span><span className="material-symbols-outlined">done</span></span>
        </label>
        <img src={data[0].image_url} alt="" />
        <span className='cartProduct'>
          <b>물고기</b>
          <p>{data[0].name}</p>
        </span>
      </li>
      <li className="cartAmount">
        <span>
          <button onClick={handleMinus}><span className="material-symbols-outlined">remove</span></button>
          <input type="number" onChange={(e) => handleInput(e)} ref={inputRef} min={1} max={99}/>
          <button onClick={handlePlus}><span className="material-symbols-outlined">add</span></button>
        </span>
      </li>
      <li className="cartCost">
        <p className="money"><b>{totalCost}</b>벨</p>
      </li>
    </menu>
  );
};

export default CartObject;