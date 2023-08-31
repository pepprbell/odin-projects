import { useEffect, useRef, useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './CartObject.css'
import useCart from '../hooks/useCart';

const CartObject = ({ data, oncheck, checkRef }) => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const [num, setNum] = useState(1)
  const [totalCost, setTotalCost] = useState(1)
  const defaultCost = data[0].sell_nook
  const [checked, setChecked] = oncheck

  const inputRef = useRef(null)

  // 기본 카트 내용물 디스플레이
  useEffect(() => {
    let n = parseInt(data[1])
    setNum(n)
    inputRef.current.value = n
  }, [])

  // 합계 금액 표시 + 카트 업데이트
  useEffect(() => {
    useCart('update', data[0], cartHandler, num)
    setTotalCost((num*defaultCost).toLocaleString('en-US'))
    inputRef.current.value = num
  }, [num])

  // 체크시 true / false 전달
  const handleCheck = (e) => {
    const newChecked = new Map(checked)
    newChecked.set(data[0], e.target.checked ? 1 : 0)
    setChecked(newChecked)
  }

  const handleInput = (e) => {
    console.log(e)
    if (e.target.value === "") {
      setNum(1)
      if (e.type == 'blur') {
        e.target.value = 1
      }
      setTotalCost(defaultCost.toLocaleString('en-US'))
      return
    }
    const n = parseInt(e.target.value)
    if (n > 99) {
      alert('최대 구매 가능 개수는 99개입니다.')
      setNum(99)
    } else if (n <= 1) {
      setNum(1)
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
          <p>{data[0].nameKR}</p>
        </span>
      </li>
      <li className="cartAmount">
        <span>
          <button onClick={handleMinus}><span className="material-symbols-outlined">remove</span></button>
          <input type="number" onChange={(e) => handleInput(e)} ref={inputRef} onBlur={handleInput} min={1} max={99}/>
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