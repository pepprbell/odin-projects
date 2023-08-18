import { useEffect, useRef } from 'react';
import './Card.css'
import useCart from '../hooks/useCart';

const Card = ({res, cartHandler}) => {
  const data = res
  const ref = useRef(0)

  useEffect(() => {
    ref.current = data.name + '_' + data.number
  }, [])

  const addToCart = () => {
    useCart(cartHandler).addItem(res)
  }

  return (
    <div className="card">
      <figure>
        {data['image_url'] != '' ? <img src={data['image_url']} alt=""  /> : <div><span className="material-symbols-outlined notSupported">image_not_supported</span></div> }
        <button onClick={addToCart}><span className="material-symbols-outlined">add_shopping_cart</span></button>
      </figure>
      <p>{data.name}</p>
      <p className="money"><b>{data.sell_nook}</b>벨</p>
    </div>
  );
};

export default Card;