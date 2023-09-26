import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Carousel.css'
import Image from './Image'

const Carousel = ({  }) => {
  const [imageList, setImageList] = useState([])
  const urlList = [
    'https://github.com/pepprbell/odin-projects/assets/67995526/7bf31da7-95b5-413e-afcc-083e58db32d8',
    'https://github.com/pepprbell/odin-projects/assets/67995526/18c9726a-d836-4305-a24c-7b86b58811ef',
    'https://github.com/pepprbell/odin-projects/assets/67995526/17a64bbb-5230-4ab5-bfe7-a0220548f5b4',
    'https://github.com/pepprbell/odin-projects/assets/67995526/b497650b-e1e9-41b9-b183-26cb1a94ecfc',
  ]
  const hrefList = [
    '/fish/King salmon',
    '/bugs/emperor butterfly',
    '/sea/lobster',
    '/',
  ]
  const [current, setCurrent] = useState(0)
  const [transition, setTransition] = useState('smooth')
  const [buttonSwitch, setButtonSwitch] = useState(false)
  const bannerWidth = 820
  const viewRef = useRef(null)

  useEffect(() => {
    getImage()
    setCurrent(0)
    transform(0)

    window.addEventListener('resize', () => transform(current))
    return () => window.removeEventListener('resize', () => transform(current))
  }, [])

  useEffect(() => {
    if (transition === 'smooth') return
    move()

    setTimeout(() => {
      setTransition('smooth')
    }, 50);
  }, [transition])

  function getImage() {
    const newList = []
    const len = urlList.length
    for (let i = -2; i < len+2; i++) {
      let idx = i < len ? i : i - len
      newList.push(
      <li key={i}>
        <Link to={hrefList.at(idx)} className="bannerLink" />
        <Image src={urlList.at(idx)}/>
      </li>)
    }
    setImageList(newList)
  }

  function transform(curr) {
    // 화면 너비 (스크롤바 제외)
    const w = document.documentElement.clientWidth
    console.log(w, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

    // 기본 offset
    const raw = w > 820 ?
      bannerWidth*2.5 - w/2 : 
      Math.min(w, bannerWidth*2.5 - w/2)

    const newDx = w > 1000 ? bannerWidth*curr + raw : 
      w > bannerWidth ? bannerWidth*curr + raw + 16 : raw*curr + 16
    
    viewRef.current.style.transform = `translate(-${newDx}px)`

    if (curr < 0) {  // curr 마지막으로 가기
      setTimeout(() => {
        let dx = w > 1000 ? bannerWidth*(urlList.length-1) + raw : 
          w > bannerWidth ? bannerWidth*(urlList.length-1) + raw + 16 : raw*(urlList.length-1) + 16
        move(dx)
      }, 200);

    } else if (curr > urlList.length-1) { // curr 0으로 가기
      setTimeout(() => {
        let dx = w > 1000 ? raw : 
          w > bannerWidth ? raw + 16 : 16
        move(dx)
      }, 200);
    }
  }

  function move(dx) {
    setTransition('')
    viewRef.current.style.transform = `translate(-${dx}px)`

    setTimeout(() => {
      setTransition('smooth')
    }, 100)
  }

  function prev() {
    setButtonSwitch(true)

    setTimeout(() => {
      setButtonSwitch(false)
    }, 300);

    transform(current-1)
    setCurrent(current !== 0 ? current-1 : urlList.length-1)
    
  }

  function next() {
    setButtonSwitch(true)

    setTimeout(() => {
      setButtonSwitch(false)
    }, 300);

    transform(current+1)
    setCurrent(current !== urlList.length-1 ? current+1 : 0)
          
  }

  return (
    <div className="carousel">
      <ul className={"viewport " + transition} ref={viewRef}>
        {imageList}
      </ul>
      <button className="prev" onClick={prev} disabled={buttonSwitch}><span className="material-symbols-rounded">arrow_back_ios_new</span></button>
      <button className="next" onClick={next} disabled={buttonSwitch}><span className="material-symbols-rounded">arrow_forward_ios</span></button>
      <span className="count"><b>{current + 1}</b> / {urlList.length}</span>
    </div>
  )
}

export default Carousel