import { Component } from 'react';
import './App.css';
import Header from './components/Header';

class App extends Component {
  constructor() {
    super()
  }

  header = {
    name: '차수연',
    email: 'pepprbell@gmail.com',
    github: 'github.com/pepprbell'
  }

  render() {
    return (
      <div className="App">
        <Header data={this.header}></Header>
      </div>
    );
  }
}

export default App;
