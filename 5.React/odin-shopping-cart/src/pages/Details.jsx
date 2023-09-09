import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'
import useItemFetching from '../hooks/useItemFetching';
import { DataContext } from '../context/DataContext';
import capitalize from '../utils/capitalize';
import nameData from '../assets/nameData'
import useCart from '../utils/useCart';
import CountButton from '../components/CountButton'

const Details = () => {
  const [dataHandler, cartHandler] = useContext(DataContext)
  const [originalData, setData] = dataHandler
  const { type, name } = useParams()
  const [num, setNum] = useState(1)
  
  const { data, error, loading } = useItemFetching(type, name)
  const [res, setRes] = useState(null)
  
  const inputref = useRef(null)

  useEffect(() => {
    inputref.current.value = num
  }, [num])

  useEffect(() => {
    if (!data[0]) return

    originalData.get(`${type}-default`).forEach(each => {
      if (each.name == data[0].name) {
        setRes(each)
        return
      }
    });
  }, [data])
  
  function handleClick() {
    useCart('add', res, cartHandler, num)
  }

  return (
    <section className="details">
      {loading ? (
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
      ) : error ? (
        <h1>error</h1>
      ) : (
        <>
        <aside>
          <figure>
            {data[0].image_url != '' ? <img src={data[0].image_url} alt=""  /> : <div><span className="material-symbols-outlined notSupported">image_not_supported</span></div> }
          </figure>
        </aside>
        <article>
          <p className='type'>{nameData.category[type]}</p>
          <p className='itemName'>{data[0].nameKR}</p>
          <i>{capitalize(data[0].name)}</i>
          <q>{data[0].catchphrases}</q>
          <p className='money'><b>{data[0].sell_nook.toLocaleString('en-US')}</b>벨</p>
          <p className='shippingDesc'>택배배송 | 배송비 1,200벨 (10,000벨 이상 무료) | 너굴 택배</p>
          <div className='option'>
            <CountButton className="cntbutton" numstate={[num, setNum]} inputref={inputref} />
          </div>
          <p className='money'>총 {num}개  |  <b>{(num*data[0].sell_nook).toLocaleString('en-US')}</b>벨</p>
          <button className='addCart' onClick={handleClick}><span className="material-symbols-outlined"></span>장바구니</button>
        </article>
        <main></main>
        </>
      )}
    </section>
  );
};

export default Details;