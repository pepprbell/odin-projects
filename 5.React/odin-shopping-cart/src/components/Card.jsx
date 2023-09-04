import { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Card.css'
import useCart from '../utils/useCart';
import { DataContext } from '../context/DataContext';

const Card = ({ res, type }) => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const data = res
  const ref = useRef(0)

  useEffect(() => {
    ref.current = data.name + '_' + data.number
  }, [])

  const addToCart = () => {
    useCart('add', res, cartHandler)
  }

  return (
    <div className="card">
      <Link to={'/'+type+'/'+data.name} className='overlayLink'></Link>
      <figure>
        {data['image_url'] != '' ? <img src={data['image_url']} alt=""  /> : <div><span className="material-symbols-outlined notSupported">image_not_supported</span></div> }
        <button onClick={addToCart}><span className="material-symbols-outlined">add_shopping_cart</span></button>
      </figure>
      <p>{data.nameKR}</p>
      <p className="money"><b>{data.sell_nook.toLocaleString('en-US')}</b>벨</p>
    </div>
  );
};

export default Card;