import React, { Component } from 'react'
import Input from './Input'
import '../styles/Section.css'

class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }))
  }

  render() {
    const data = this.props.data.data
    const items = data.map((item, idx) =>
       <div className='container' key={idx} id={this.props.data.sectionName + idx}>
        <div className='left'>
          <Input type='date' isEditing={this.state.isEditing}>{item.date}</Input>
        </div>
        <div className='v-line'></div>
        <div className='right'>
          <div>
            <Input type='title' isEditing={this.state.isEditing}>{item.title}</Input> 
            <Input type='desc' isEditing={this.state.isEditing}>{item.desc}</Input>
          </div>
        </div>
       </div> 
      )

    let button;
    if (!this.state.isEditing) {
      button = <button onClick={this.handleClick}><span className="material-symbols-outlined">edit</span></button>
    } else {
      button = <button onClick={this.handleClick}><span className="material-symbols-outlined">done</span></button>
    }
      
    return (
      <div className='section-body'>
        <Input type='section'>{this.props.data.sectionName}</Input>
        {button}
        <div className='section-list'>
          {items}
        </div>
    </div>
    )
  }
}

export default Section