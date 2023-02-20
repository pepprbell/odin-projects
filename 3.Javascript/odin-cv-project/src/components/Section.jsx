import React, { Component } from 'react'
import Input from './Input'
import './Section.css'

class Section extends Component {
  constructor(props) {
    super(props)
  }

  // todo
  // edit mode when click
  // display/hide button when hover

  render() {
    const data = this.props.data.data
    const items = data.map((item, idx) =>
       <div className='container' key={idx} name={this.props.data.sectionName + idx}>
        <div className='left'>
          <Input type='date'>{item.date}</Input>
        </div>
        <div className='v-line'></div>
        <div className='right'>
          <div>
            <Input type='title'>{item.title}</Input> 
            <Input type='desc'>{item.desc}</Input>
          </div>
        </div>
        <button><span className="material-symbols-outlined">edit</span></button>
       </div> 
      )

    return (
      <div className='section-body'>
        <Input type='section'>{this.props.data.sectionName}</Input>
        <div className='section-list'>
          {items}
        </div>
      </div>
    )
  }
}

export default Section