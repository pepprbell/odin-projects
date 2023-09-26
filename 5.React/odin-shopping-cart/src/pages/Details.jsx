import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'
import useItemFetching from '../hooks/useItemFetching';
import useDataFetching from '../hooks/useDataFetching';
import { DataContext } from '../context/DataContext';
import CountButton from '../components/CountButton';
import Display from '../components/Display';
import capitalize from '../utils/capitalize';
import useCart from '../utils/useCart';
import nameData from '../assets/nameData'
import Location from '../components/Location';

const Details = () => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const { type, name } = useParams()
  const [num, setNum] = useState(1)
  
  const { itemData, itemError, itemLoading } = useItemFetching(type, name)
  const { data, error, loading } = useDataFetching(type, dataHandler)
  const [res, setRes] = useState(null)
  
  const inputref = useRef(null)

  useEffect(() => {
    inputref.current.value = num
  }, [num])

  useEffect(() => {
    if (!itemData[0]) return

    if (data.length > 0) {
      data.forEach(each => {
        if (each.name == itemData[0].name) {
          setRes(each)
          return
        }
      });
    }
  }, [itemData, data])
  
  function handleClick() {
    useCart('add', res, cartHandler, num)
  }

  return (
    <section className="details">
      <Location />
      {itemLoading ? (
        <>
        <aside className='detailLoading'>
          <figure></figure>
        </aside>
        <article className='detailLoading'>
          <p className='type'></p>
          <p className='itemName'></p>
          <i></i>
          <q></q>
          <p className='money'><b></b></p>
          <p className='shippingDesc'></p>
          <div className='option'>
            <CountButton className="cntbutton" numstate={[num, setNum]} inputref={inputref} />
          </div>
          <p className='money'><b></b></p>
          <button className='addCart'><span className="material-symbols-outlined"></span>장바구니</button>
        </article>
        </>
      ) : itemError ? (
        <h1>error</h1>
      ) : (
        <>
        <aside>
          <Display urlList={[itemData[0].image_url, itemData[0].render_url]} />
        </aside>
        <article>
          <p className='type'>{nameData.category[type]}</p>
          <p className='itemName'>{itemData[0].nameKR}</p>
          <i>{capitalize(itemData[0].name)}</i>
          <q>{itemData[0].catchphrases}</q>
          <p className='money'><b>{itemData[0].sell_nook.toLocaleString('en-US')}</b>벨</p>
          <p className='shippingDesc'>택배배송 | 배송비 1,200벨 (10,000벨 이상 무료) | 너굴 택배</p>
          <div className='option'>
            <CountButton className="cntbutton" numstate={[num, setNum]} inputref={inputref} />
          </div>
          <p className='money'>총 {num}개  |  <b>{(num*itemData[0].sell_nook).toLocaleString('en-US')}</b>벨</p>
          <button className='addCart' onClick={handleClick}><span className="material-symbols-outlined"></span>장바구니</button>
        </article>
        <main></main>
        </>
      )}
    </section>
  );
};

export default Details;