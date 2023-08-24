import { useParams } from 'react-router-dom'
import useDataFetching from '../hooks/useDataFetching';
import Card from '../components/Card'
import { useEffect, useRef, useContext, useState } from 'react';
import './Category.css'
import { DataContext } from '../context/DataContext';
import useSort from '../hooks/useSort';

const Category = () => {
  let { type } = useParams()
  const [dataHandler, cartHandler] = useContext(DataContext)
  
  const { data, error, loading } = useDataFetching(type, dataHandler)

  const [orderBy, setOrderBy] = useState('default')
  const [sortedData, setSortedData] = useState(data)

  const typeDict = {
    'fish': '물고기',
    'bugs': '곤충',
  }
  
  // console.log(data)
    
  useEffect(() => {
    // 페이지 로딩 시 기본 정렬 자동 선택
    inputRef.current.childNodes[0].checked = true
    setSortedData(data)
  }, [])
  
  const inputRef = useRef(null)  
  
  useEffect(() => {
    setSortedData(handleSort(orderBy))
  }, [orderBy, data])


  const handleSort = (orderBy) => {
    return useSort(data, type, orderBy, dataHandler)
  }

  return (
    <section className='category'>
      <section className='cateTitle'>
        <h1>{typeDict[type]}</h1>
        <div ref={inputRef}>
          <input type="radio" id='default' name="order_by" onChange={() => setOrderBy('default')}/>
          <label htmlFor="default">기본 정렬</label>
          <input type="radio" id='asc' name="order_by" onChange={() => setOrderBy('asc')}/>
          <label htmlFor="asc">낮은 가격순</label>
          <input type="radio" id='desc' name="order_by" onChange={() => setOrderBy('desc')}/>
          <label htmlFor="desc">높은 가격순</label>
        </div>
      </section>
      <article>
        <menu>
          {loading ? (
            <div><h1>loading...</h1></div>
          ) : error ? (
            <div><h1>error</h1></div>
          ) : (
            sortedData.map((each) => {
            return <li key={each.name}><Card res={each} cartHandler={cartHandler} /></li>
            })
          )}
        </menu>
      </article>
    </section>
  );
};

export default Category;