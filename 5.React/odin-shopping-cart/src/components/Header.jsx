import { Link } from 'react-router-dom';
import './Header.css'
import { useEffect, useRef } from 'react';
import CustomLink from './CustomLink'
import logo from '../assets/logo.png'

const Header = ({ cartLength }) => {
  const categories = [['fish','물고기'], ['bugs','곤충'], ['sea','바다 생물'],]
  const src = logo

  const cartRef = useRef(null)

  useEffect(() => {
    if (cartLength === 0) {
      cartRef.current.style.display = 'none'
    } else {
      cartRef.current.style.display = 'block'
    }
  }, [cartLength])

  return (
    <header>
      <section>
        <Link to='/' className='logo'><img src={src} alt="" /></Link>
        <Link to='/cart' className='shop'><span ref={cartRef} className='circle'>{ cartLength ? cartLength : localStorage.length }</span><span className="material-symbols-rounded">shopping_cart</span></Link>
      </section>
      <nav>
        {categories.map((category, idx) => {
          return <CustomLink category={category} className='navLink' key={idx}></CustomLink>
        })}
      </nav>
    </header>
  );
};

export default Header;