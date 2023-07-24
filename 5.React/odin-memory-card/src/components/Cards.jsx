import './Cards.css'

function Cards({numList, onclick}) {  
  if (numList.length == 0) {
    numList = [1,2,3,4,5,6,7,8,9]
  }

  const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  return (
    <>
      {numList.map((num) => {
        let imgSrc = url + num + '.png'
        return (
          <div className='card' onClick={onclick} id={num} key={num}>
            <img src={imgSrc} alt="" />
          </div>
        )
      })}
    </>
  )
}

export default Cards;