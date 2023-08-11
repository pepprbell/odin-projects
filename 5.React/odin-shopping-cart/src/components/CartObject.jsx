import { useEffect, useState } from 'react';
import './CartObject.css'

const CartObject = ({ data, oncheck, onchange }) => {
  const [num, setNum] = useState(1)
  const [totalCost, setTotalCost] = useState(1)
  const defaultCost = 1

  console.log(data)

  const name = data[0].slice(0,data[0].indexOf('_'))

  useEffect(() => {
    let n = parseInt(data[1])
    setNum(n)
  }, [])

  useEffect(() => {
    setTotalCost(num*defaultCost)
  }, [num])

  const handlePlus = () => {
    if (num < 99) {
      setNum(num+1)
    } else {
      alert('최대 구매 가능 개수는 99개입니다.')
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
          <input type="checkbox" name="" id="" onChange={oncheck} />
          <span><span className="material-symbols-outlined">done</span></span>
        </label>
        <img src="" alt="" />
        <span className='cartProduct'>
          <b>물고기</b>
          <p>{name}</p>
        </span>
      </li>
      <li className="cartAmount">
        <span>
          <button onClick={handleMinus}><span className="material-symbols-outlined">remove</span></button>
          <input type="number" onChange={onchange} value={num}/>
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