import React, { Component } from 'react'
import '../styles/Header.css'

class Header extends Component {
  link = 'https://www.' + this.props.data.github

  render() {
    console.log(this.props)
    return (
      <div className='header'>
        <h2>{this.props.data.name}</h2>
        <p>{this.props.data.email}</p>
        <a href={this.link}>{this.props.data.github}</a>
        <div className='line'></div>
      </div>
    )
  }
}

export default Header