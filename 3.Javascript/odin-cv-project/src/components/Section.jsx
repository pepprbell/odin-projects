import React, { useState } from 'react'
import Input from './Input'
import '../styles/Section.css'

function Section(props) {

  const [isEditing, setIsEditing] = useState(false)

  function handleClick() {
    setIsEditing(!isEditing)
  }

  const data = props.data.data
  const items = data.map((item, idx) =>
      <div className='container' key={idx} id={props.data.sectionName + idx}>
      <div className='left'>
        <Input type='date' isEditing={isEditing}>{item.date}</Input>
      </div>
      <div className='v-line'></div>
      <div className='right'>
        <div>
          <Input type='title' isEditing={isEditing}>{item.title}</Input> 
          <Input type='desc' isEditing={isEditing}>{item.desc}</Input>
        </div>
      </div>
      </div> 
    )

  let button;
  if (!isEditing) {
    button = <button onClick={handleClick}><span className="material-symbols-outlined">edit</span></button>
  } else {
    button = <button onClick={handleClick}><span className="material-symbols-outlined">done</span></button>
  }
      
  return (
    <div className='section-body'>
      <Input type='section'>{props.data.sectionName}</Input>
      {button}
      <div className='section-list'>
        {items}
      </div>
  </div>
  )
}

export default Section