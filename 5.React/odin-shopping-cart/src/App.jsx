import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './components/Header'
import Cart from './pages/Cart'
import Category from './pages/Cart'
import Home from './pages/Cart'
import './App.css'

function App() {
  const { page } = useParams()

  return (
    <>
      <Header />
      {page === 'cart' ? (
        <Cart />
      ) : page === 'category' ? (
        <Category />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App
