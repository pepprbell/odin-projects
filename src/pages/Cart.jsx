import { useEffect, useRef, useContext, useState } from "react";
import { DataContext } from '../context/DataContext';
import useCart from "../utils/useCart";
import CartObject from "../components/CartObject";
import ShippingBar from "../components/ShippingBar";
import './Cart.css'

const Cart = () => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const [totalCost, setTotalCost] = useState(0)
  const [checked, setChecked] = useState(new Map)
  const [cart, setCart] = cartHandler

  // 체크박스 ref들
  const selectAllRef = useRef(null)
  const inputRefs = useRef({})

  useEffect(() => {
    setChecked(cart)
    handleCheckAll()
  }, [])

  useEffect(() => {
    sumCart()
  }, [cart])

  useEffect(() => {
    handleCheck()
    sumCart()
  }, [checked])

  // 체크가 하나 풀리면 전체선택이 취소되는 것
  const handleCheck = () => {
    const isEveryChecked = Array.from(checked).every((item, value) => {
      return item[1] !== 0
    })

    selectAllRef.current.checked = isEveryChecked
  }

  // 전체선택 누를 때 동작
  const handleCheckAll = (e) => {
      const isChecked = e ? e.target.checked : true
  
      const updatedChecked = new Map()
      Array.from(cart).forEach(([item, quantity]) => {
        updatedChecked.set(item, isChecked ? quantity : 0)
        inputRefs.current[item.name].checked = isChecked
      })
    
      setChecked(updatedChecked)
  }

  // 카트에 있는거 순회하면서 체크되어있는것만 array로 모아서 삭제요청
  const deleteItem = (item=false) => {
    const deleteList = []

    if (item) {
      deleteList.push(item)
      const res = confirm(`해당 상품을 장바구니에서 삭제하시겠습니까?`)
      res ? useCart('delete', deleteList, cartHandler) : 0
      return
    }

    Array.from(cart).forEach(([item, quantity]) => {
      const isChecked = inputRefs.current[item.name].checked
      isChecked ? deleteList.push(item) : 0
    })

    if (deleteList.length === 0) {
      alert('삭제하실 상품을 선택해 주세요.')
    } else {
      const res = confirm(`선택하신 ${deleteList.length}개 상품을 장바구니에서 삭제하시겠습니까?`)
      res ? useCart('delete', deleteList, cartHandler) : 0
    }
  }

  // 카트에 있는 물건 reduce로 총합 계산
  const sumCart = () => {
    const newSum = Array.from(cart).reduce((prev, curr) => {
      const isChecked = checked.get(curr[0])!==0 ? 1 : 0
      return prev + curr[0].sell_nook * curr[1] * isChecked
    }, 0)

    setTotalCost(newSum)
  }

  return (
    <section className="cart">
      <section className="cartTitle">
        <label className='checkbox'>
          <input type="checkbox" name="" id="" ref={selectAllRef} onChange={handleCheckAll} />
          <span><span className="material-symbols-rounded">done</span></span>
          전체 선택
        </label>
        <button onClick={() => deleteItem(false)}><span className="material-symbols-rounded">close</span>선택 상품 삭제</button>
      </section>
      <article className="cartMain">
        {cart.size === 0 ? (
          <div className="missingCart">
            <span className="material-symbols-rounded">shopping_cart</span>
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </div>
        ) : (
          <menu>
            {Array.from(cart).map((each) => {
              return (
              <li key={each[0].name}>
                <CartObject data={each} oncheck={[checked, setChecked]} 
                  checkRef={ref => inputRefs.current[each[0].name] = ref} del={deleteItem} />
              </li>)
            })}
          </menu>
        )}
      </article>
      {cart.size === 0 ? (
        <></>
      ) : (
        <ShippingBar money={totalCost} />
      )}
      <section className="checkout">
        {totalCost < 10000 && cart.size !== 0 ? (
          <p>총 <b>{cart.size}</b>개 + 배송비 <b>1,200</b>벨</p>
        ) : (
          <p>총 <b>{cart.size}</b>개</p>
        )}
        <span>
          <p>결제예정금액<span><b>{totalCost >= 10000 || cart.size === 0 ? totalCost.toLocaleString('en-US') : (totalCost+1200).toLocaleString('en-US')}</b>벨</span></p>
          <button>주문하기</button>
        </span>
      </section>
    </section>
  );
};

export default Cart;