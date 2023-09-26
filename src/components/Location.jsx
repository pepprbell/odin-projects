import { Link, useParams } from 'react-router-dom';
import nameData from '../assets/nameData'
import './Location.css'

const Location = () => {
  const prev = useParams()

  function getLocation() {
    const location = [
      <Link to='/' key='home'>홈</Link>,
      ' / ',
      <Link to={'/'+prev.type} key='type'>{nameData.category[prev.type]}</Link>
    ]
    
    return location
  }


  return (
    <nav className="location">
        {getLocation()}
    </nav>
  );
};

export default Location;