import { Component } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Section from './components/Section';

class App extends Component {
  constructor() {
    super()
  }

  header = {
    name: '차수연',
    email: 'pepprbell@gmail.com',
    github: 'github.com/pepprbell'
  }

  education = {
    sectionName: 'Education',
    data: [
    {date: '2016. 02 - 2020. 08',
     title: '경희대학교',
     desc: '우주과학과 학사'},
    {date: '2020. 07 - 2021. 06',
     title: '삼성 청년 SW 아카데미',
     desc: 'desc'},
    ]
  }

  projects = {
    sectionName: 'Projects',
    data:[
    {date: '2021. 01 - 2021. 02',
      title: 'Random project',
      desc: 'random description'},
    {date: '2021. 01 - 2021. 02',
      title: 'Random project',
      desc: 'random description'},
    {date: '2021. 01 - 2021. 02',
      title: 'Random project',
      desc: 'random description'},
    ]
  }

  render() {
    return (
      <div className="App">
        <Header data={this.header}></Header>
        <Section data={this.education}></Section>
        <Section data={this.projects}></Section>
      </div>
    );
  }
}

export default App;
