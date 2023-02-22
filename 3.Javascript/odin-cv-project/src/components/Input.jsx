import React, { useState } from 'react'
import '../styles/Input.css'

function Input(props) {

  const [value, setValue] = useState(props.children)
  const [areaHeight, setAreaHeight] = useState('45px')

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleMultiLine(e) {
    setValue(e.target.value)
    setAreaHeight(e.target.scrollHeight)
  }

  const type = props.type
  let input;
  if (props.isEditing) {
    if (type === 'section') {
      input = <input className='input-h3' onChange={handleChange} value={value}></input>
    } else if (type === 'date') {
      input = <input className='input-p' onChange={handleChange} value={value}></input>
    } else if (type === 'title') {
      input = <input className='input-h4' onChange={handleChange} value={value}></input>
    } else if (type === 'desc') {
      input = <textarea className='input-area' onChange={handleMultiLine} value={value} style={{ height: this.state.areaHeight }}></textarea>
    }
  } else {
    if (type === 'section') {
      input = <h3>{value}</h3>
    } else if (type === 'date') {
      input = <p>{value}</p>
    } else if (type === 'title') {
      input = <h4>{value}</h4>
    } else if (type === 'desc') {
      input = <p>{value}</p>
    }
  }

  const classname = `input ` + type

  return (
    <div className={classname}>
      {input}
    </div>
  )
}

export default Input