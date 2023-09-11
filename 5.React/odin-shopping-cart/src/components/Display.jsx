import { useState } from "react"
import Image from "./Image"
import './Display.css'

const Display = ({ urlList }) => {
  const [curr, setCurr] = useState(urlList[0])

  function onHover(e) {
    if (!e.target.currentSrc) {
      return
    }
    setCurr(e.target.currentSrc)
  }
  
  function mini() {
    if (!urlList) {
      return
    }

    const figs = []
    urlList.forEach((each,idx) => {
      figs.push(
        <figure key={idx} onMouseOver={onHover}>
          <Image src={each ? each : ''} />
        </figure>
      )
    });
    return figs
  }

  return (
    <div className="display">
      <figure>
        <Image src={curr} />
      </figure>
      {mini()}
    </div>
  )
}

export default Display