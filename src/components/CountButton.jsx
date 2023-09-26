import './CountButton.css'

const CountButton = ({ numstate, inputref }) => {
  const [num, setNum] = numstate

  const handleInput = (e) => {
    if (e.target.value === "") {
      setNum(1)
      if (e.type == 'blur') {
        e.target.value = 1
      }
      return
    }
    const n = parseInt(e.target.value)
    if (n > 99) {
      alert('최대 구매 가능 개수는 99개입니다.')
      setNum(99)
    } else if (n <= 1) {
      setNum(1)
    } else {
      setNum(n)
    }
  }

  const handlePlus = () => {
    if (num < 99) {
      setNum(num+1)
    } else {
      alert('최대 구매 가능 개수는 99개입니다.')
      setNum(99)
    }
  }
  const handleMinus = () => {
    if (num > 1) {
      setNum(num-1)
    }
  }


  return (
    <span className="countButton">
      <button onClick={handleMinus}><span className="material-symbols-rounded">remove</span></button>
      <input type="number" onChange={(e) => handleInput(e)} ref={inputref} onBlur={handleInput} min={1} max={99}/>
      <button onClick={handlePlus}><span className="material-symbols-rounded">add</span></button>
    </span>
  )
}

export default CountButton