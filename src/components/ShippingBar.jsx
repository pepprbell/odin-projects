import { useState, useEffect, useRef } from 'react'
import './ShippingBar.css'

const ShippingBar = ({ money }) => {
  const [len, setLen] = useState(0)
  const bar = useRef(null)
  const diff = money <= 10000 ? 10000 - money : 0

  // viewport 변화 감지 추가? addEventListener("resize", (event) => {});
  useEffect(() => {
    const fullWidth = bar.current.clientWidth

    const newWidth = fullWidth * money / 10000
    
    setLen(newWidth >= fullWidth ? fullWidth : newWidth)
  }, [money])

  return (
    <section className='shipping'>
      <div className='bar' ref={bar}>
        <div className='fill' style={{width: len+"px"}}></div>
      </div>
      <p><b>{diff.toLocaleString('en-US')}</b>벨 추가하면 무료배송!</p>
    </section>
  )
}

export default ShippingBar