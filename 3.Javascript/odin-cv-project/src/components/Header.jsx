import '../styles/Header.css'

function Header(props) {
  const link = 'https://www.' + props.data.github

  return (
    <div className='header'>
      <h2>{props.data.name}</h2>
      <p>{props.data.email}</p>
      <a href={link}>{props.data.github}</a>
      <div className='line'></div>
    </div>
  )
}

export default Header