import { useOutletContext, useParams } from 'react-router-dom'
import fetchData from '../hooks/fetchData';
import Card from '../components/Card'
import { useEffect, useState } from 'react';
import './Category.css'

const Category = () => {
  let { type } = useParams()
  const updateCart = useOutletContext()

  const { data, error, loading } = fetchData(type)

  const [typeKR, setTypeKR] = useState('')
  
  useEffect(() => {
    switch (type) {
      case 'fish':
        setTypeKR('물고기')
        break;
    
      case 'bugs':
        setTypeKR('곤충')
      break;
    }

    
  }, [type])

  console.log(data)

  return (
    <section className='category'>
      <section className='cateTitle'>
        <h1>{typeKR}</h1>
        <div>
          <input type="radio" id='default' name="order_by"/>
          <label htmlFor="default">기본 정렬</label>
          <input type="radio" id='asc' name="order_by"/>
          <label htmlFor="asc">낮은 가격순</label>
          <input type="radio" id='desc' name="order_by"/>
          <label htmlFor="desc">높은 가격순</label>
        </div>
      </section>
      <article>
        <menu>
          {data.map((each, idx) => {
            if (idx >= 1) {
              console.log()
            }
            return <li key={idx}><Card res={each} onclick={updateCart}/></li>
          })}
        </menu>
      </article>
    </section>
  );
};

export default Category;