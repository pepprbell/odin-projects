import { useEffect, useState } from 'react'
import Cards from './components/Cards.jsx'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [numList, setNumList] = useState([])
  const [newList, setNewList] = useState([])
  const [record, setRecord] = useState([])
  
  useEffect(() => {
    if (newList.length == 9) {
      setNumList(newList)
      return
    }
    let code = Math.floor(Math.random() * 1009) + 1
    if (newList.indexOf(code) == -1 && record.indexOf(code) == -1) {
      setNewList([...newList, code])
    }
    console.log(code, newList)
  }
  , [newList])

  function newCards() {
    setNewList([])
  }

  function mixCards() {
    setNumList(numList.sort(() => Math.random() - 0.5))
  }

  function clickHandler(e) {
    let node = e.target.parentNode
    console.log(record)
    // record
    if (record.indexOf(node.id) != -1) {
      // if wrong -> reset current score -> new list
      setScore(0)
      newCards()
      setRecord([])
    } else {
      if (best < score+1) {
        // set best score
        setBest(score+1)
      }
      setScore(score+1)

      if ((record.length+1) % 9 == 0 && record.length != 0) {
        // if right -> if all done -> new list
        newCards()
        console.log('complete')
      } else {
        //          -> if yet done -> mix
        mixCards()
      }
      setRecord([...record, node.id])
    }
  }

  return (
    <>
      <div className='container'>
        <header className='header'>
          <div className='title'>
            <h1>Memory Card</h1>
          </div>
          <div className='scoreboard'>
            <p>Score:</p><p>{score}</p>
            <p>Best:</p><p>{best}</p>
          </div>
        </header>
        <section>
          <div className='cards'>
            <Cards numList={numList} onclick={clickHandler}></Cards>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
