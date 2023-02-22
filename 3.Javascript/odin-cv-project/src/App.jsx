import './styles/App.css';
import Header from './components/Header';
import Section from './components/Section';

function App() {

  const header = {
    name: '차수연',
    email: 'pepprbell@gmail.com',
    github: 'github.com/pepprbell'
  }

  const education = {
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

  const projects = {
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

  return (
    <div className="App">
      <Header data={header}></Header>
      <Section data={education}></Section>
      <Section data={projects}></Section>
    </div>
  );
}

export default App;
