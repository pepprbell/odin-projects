import { Link, useLocation } from 'react-router-dom';

const CustomLink = ({ category, className }) => {
  const location = useLocation()

  const here = location.pathname.includes(`/${category[0]}`)

  return <Link to={category[0]} className={here ? className + ' bold' : className} key={category[0]} >{category[1]}</Link>
}

export default CustomLink