import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const categories = [['fish','물고기'], ['bugs','곤충'],]
  const src = 'https://github.com/pepprbell/odin-projects/assets/67995526/f3edc535-175f-4ae5-aceb-08ca4cfade6c'

  return (
    <header>
      <section className='upperSection'>
        <Link to='/' className='logo'><img src={src} alt="" /></Link>
        <Link to='/cart' className='shop'><span class="material-symbols-outlined">shopping_cart</span></Link>
      </section>
      <section className='lowerSection'>
        {categories.map((category) => {
          return <Link to={category[0]} className='navLink'>{category[1]}</Link>
        })}
      </section>
    </header>
  );
};

export default Header;