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
  const [printedData, setPrintedData] = useState([])

  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const itemsPerPage = 40

  const inputRef = useRef(null)  

  // 페이지 로딩 시 기본 정렬 자동 선택
  useEffect(() => {
    inputRef.current.childNodes[0].checked = true
    setSortedData(data)
  }, [])
  
  // 정렬 변경 시 데이터 업데이트
  useEffect(() => {
    setSortedData(handleSort(orderBy))
    setHasMore(true)
  }, [orderBy])
  
  // 데이터 변경 시 데이터 업데이트 및 페이지 초기화
  useEffect(() => {
    inputRef.current.childNodes[0].checked = true
    setSortedData(handleSort('default'))
    setHasMore(true)
  }, [data])
  
  useEffect(() => {
    setPrintedData(sortedData.slice(0,itemsPerPage))
    setHasMore(true)
  }, [sortedData])

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

  // 로딩될 때 window에 scroll 이벤트 리스너 추가
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollY = window.scrollY
      const scrollHeight = e.target.scrollingElement.scrollHeight;
      const clientHeight = e.target.scrollingElement.clientHeight;
  
      if (scrollHeight - 200 <= clientHeight + scrollY && hasMore) {
        setLoadingMore(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
  
    // 클린업
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const loadMore = () => {
      if (!hasMore) {
        setLoadingMore(false) 
        return
      }
  
      const i = printedData.length
      const e = Math.min(data.length, i + itemsPerPage)
      const newData = sortedData.slice(i, e)
  
      setPrintedData(prev => [...prev, ...newData])
      console.log(newData)
  
      if (e >= data.length) {
        console.log(e, data.length, hasMore)
        setHasMore(false)
      }
  
      setLoadingMore(false)
    }

    loadMore()
  }, [loadingMore])



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
            printedData.map((each) => {
            return <li key={each.name}><Card res={each} cartHandler={cartHandler} /></li>
            })
          )}
          {loadingMore && <p>Loading...</p>}
        </menu>
      </article>
    </section>
  );
};

export default Category;