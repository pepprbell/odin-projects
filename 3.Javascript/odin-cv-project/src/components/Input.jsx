import React, { Component } from 'react'
import '../styles/Input.css'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.children,
      areaHeight: '45px'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleMultiLine = this.handleMultiLine.bind(this)
  }

  handleChange(e) {
    this.setState(prev => ({
      value: e.target.value
    }))
  }

  handleMultiLine(e) {
    this.setState(prev => ({
      value: e.target.value,
      areaHeight: e.target.scrollHeight
    }))
  }

  render() {
    const type = this.props.type
    let input;
    if (this.props.isEditing) {
      if (type === 'section') {
        input = <input className='input-h3' onChange={this.handleChange} value={this.state.value}></input>
      } else if (type === 'date') {
        input = <input className='input-p' onChange={this.handleChange} value={this.state.value}></input>
      } else if (type === 'title') {
        input = <input className='input-h4' onChange={this.handleChange} value={this.state.value}></input>
      } else if (type === 'desc') {
        input = <textarea className='input-area' onChange={this.handleMultiLine} value={this.state.value} style={{ height: this.state.areaHeight }}></textarea>
      }
    } else {
      if (type === 'section') {
        input = <h3>{this.state.value}</h3>
      } else if (type === 'date') {
        input = <p>{this.state.value}</p>
      } else if (type === 'title') {
        input = <h4>{this.state.value}</h4>
      } else if (type === 'desc') {
        input = <p>{this.state.value}</p>
      }
    }

    const classname = `input ` + type

    return (
      <div className={classname}>
        {input}
      </div>
    )
  }
}

export default Input