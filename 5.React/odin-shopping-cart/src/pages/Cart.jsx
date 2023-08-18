import { useEffect, useRef, useContext } from "react";
import { DataContext } from '../context/DataContext';
import CartObject from "../components/CartObject";
import useCart from "../hooks/useCart";
import './Cart.css'

const Cart = () => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const [cart, setCart] = cartHandler

  const inputRefs = useRef([])

  useEffect(() => {
  }, [])

  useEffect(() => {
    console.log(cart)
  }, [cart])

  const checkHandler = () => {}

  return (
    <section className="cart">
      <section className="cartTitle">
        <label className='checkbox'>
          <input type="checkbox" name="" id="" onChange={checkHandler} />
          <span><span className="material-symbols-outlined">done</span></span>
          전체 선택
        </label>
        <button>선택 상품 삭제</button>
      </section>
      <article className="cartMain">
        {cart.size === 0 ? (
          <div className="missingCart">
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </div>
        ) : (
          <menu>
            {Array.from(cart).map((each, idx) => {
              return (
              <li key={each.name}>
                <CartObject data={each} oncheck={checkHandler} 
                  checkRef={ref => inputRefs.current[idx] = ref} cartHandler={cartHandler} />
              </li>)
            })}
          </menu>
        )}
      </article>
      <section className="checkout">
        <p>총 <b>{cart.size}</b>개</p>
        <span>
          <p>결제예정금액<span><b></b>벨</span></p>
          <button>주문하기</button>
        </span>
      </section>
    </section>
  );
};

export default Cart;