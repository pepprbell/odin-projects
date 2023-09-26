import { useEffect, useRef, useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './CartObject.css'
import useCart from '../utils/useCart';
import CountButton from './CountButton';
import { Link } from 'react-router-dom';

const CartObject = ({ data, oncheck, checkRef, del }) => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const [num, setNum] = useState(1)
  const [totalCost, setTotalCost] = useState(1)
  const defaultCost = data[0].sell_nook
  const [checked, setChecked] = oncheck

  const inputRef = useRef(null)

  // 기본 카트 내용물 디스플레이
  useEffect(() => {
    const n = parseInt(data[1])
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

  return (
    <menu className="cartObject">
      <Link to={`/${data[0].category}/${data[0].name}`} className='overlayLink' />
      <li className='cartImg'>
        <label className='checkbox'>
            <input type="checkbox" name="" id="" onChange={handleCheck} ref={checkRef} />
            <span><span className="material-symbols-rounded">done</span></span>
          </label>
          <img src={data[0].image_url} alt="" />
      </li>
      <li className="cartDesc">
        <span>
          <b>{data[0].categoryKR}</b>
          <p>{data[0].nameKR}</p>
        </span>
        <button className='delete' onClick={() => del(data[0])}><span></span></button>
      </li>
      <li className='cartAmount'>
        <CountButton numstate={[num, setNum]} inputref={inputRef} />
      </li>
      <li className="cartCost">
        <p className="money"><b>{totalCost}</b>벨</p>
      </li>
    </menu>
  );
};

export default CartObject;