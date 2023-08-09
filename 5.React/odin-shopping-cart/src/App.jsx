import { useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Cart from './pages/Cart'
import Category from './pages/Cart'
import Home from './pages/Cart'
import './App.css'

function App() {
  const [cartLength, setCartLength] = useState()

  const updateCart = () => {
    setCartLength(localStorage.length)
  }

  return (
    <>
      <Header cartLength={cartLength} />
      <main className='container' >
        <Outlet context={updateCart} />
      </main>
    </>
  )
}

export default App
