import { useParams } from 'react-router-dom'
import useDataFetching from '../hooks/useDataFetching';
import Card from '../components/Card'
import { useEffect, useRef, useContext, useState } from 'react';
import './Category.css'
import { DataContext } from '../context/DataContext';
import useSort from '../hooks/useSort';
import SkeletonCard from '../components/SkeletonCard';
import nameData from '../assets/nameData'

const Category = () => {
  let { type } = useParams()
  const [dataHandler, cartHandler] = useContext(DataContext)
  
  const { data, error, loading } = useDataFetching(type, dataHandler)

  const [orderBy, setOrderBy] = useState('default')
  const [sortedData, setSortedData] = useState(data)

  useEffect(() => {
    // 페이지 로딩 시 기본 정렬 자동 선택
    inputRef.current.childNodes[0].checked = true
    setSortedData(data)
  }, [])
  
  const inputRef = useRef(null)  
  
  useEffect(() => {
    setSortedData(handleSort(orderBy))
  }, [orderBy])

  useEffect(() => {
    inputRef.current.childNodes[0].checked = true
    setSortedData(handleSort('default'))
  }, [data])


  const handleSort = (orderBy) => {
    return useSort(data, type, orderBy, dataHandler)
  }

  const isloading = () => {
    const div = []
    for (let i = 0; i < 10; i++) {
      div.push(<li key={i}><SkeletonCard/></li>)
    }
    return div
  }

  return (
    <section className='category'>
      <section className='cateTitle'>
        <h1>{nameData['category'][type]}</h1>
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
            <>{isloading()}</>
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