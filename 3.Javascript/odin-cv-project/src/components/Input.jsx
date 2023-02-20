import React, { Component } from 'react'
import './Input.css'

class Input extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log(this.props)
    const type = this.props.type
    let input;
    if (type == 'section') {
      input = <h3>{this.props.children}</h3>
    } else if (type == 'date') {
      input = <p>{this.props.children}</p>
    } else if (type == 'title') {
      input = <h4>{this.props.children}</h4>
    } else if (type == 'desc') {
      input = <p>{this.props.children}</p>
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