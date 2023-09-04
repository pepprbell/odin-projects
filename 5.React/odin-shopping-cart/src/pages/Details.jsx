import { useParams } from 'react-router-dom';
import './Details.css'
import useItemFetching from '../hooks/useItemFetching';
import { useEffect, useState } from 'react';
import capitalize from '../utils/capitalize';
import nameData from '../assets/nameData'

const Details = () => {
  const { type, name } = useParams()

  const { data, error, loading } = useItemFetching(type, name)

  console.log(data)
  console.log()

  return (
    <section className="details">
      {loading ? (
        <>Loading</>
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
          <p className='itemName'>{data[0].nameKR}</p>
          <i>{capitalize(data[0].name)}</i>
          <p className='type'>{nameData.category[type]}</p>
          <p className='money'><b>{data[0].sell_nook.toLocaleString('en-US')}</b>벨</p>
          <p className='shipping'>택배배송 | 배송비 3,000원 (4만원 이상 무료) | 너굴 택배</p>
          <p className='money'><b></b>벨</p>
          <button><span className="material-symbols-outlined"></span>장바구니</button>
        </article>
        <main></main>
        </>
      )}
    </section>
  );
};

export default Details;