import { useState, useEffect } from "react";
import CartObject from "../components/CartObject";
import './Cart.css'

const Cart = () => {
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      let item = localStorage.getItem(key)
      setCartList(prev => [...prev, [key, item]])
    }
  }, [])

  const checkHandler = () => {}
  const changeHandler = () => {}

  return (
    <section className="cart">
      <section className="cartTitle">
        <label className='checkbox'>
          <input type="checkbox" name="" id="" onChange={checkHandler} checked />
          <span><span className="material-symbols-outlined">done</span></span>
          전체 선택
        </label>
        <button>선택 상품 삭제</button>
      </section>
      <article className="cartMain">
        {localStorage.length === 0 ? (
          <div className="missingCart">
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </div>
        ) : (
          <menu>
            {cartList.map((item, idx) => {
              return <li key={idx}><CartObject data={item} oncheck={checkHandler} onchange={changeHandler} /></li>
            })}
          </menu>
        )}
      </article>
      <section className="checkout">
        <p>총 <b>2</b>개</p>
        <span>
          <p>결제예정금액<span><b>4,300</b>벨</span></p>
          {/* <p></p> */}
          <button>주문하기</button>
        </span>
      </section>
    </section>
  );
};

export default Cart;