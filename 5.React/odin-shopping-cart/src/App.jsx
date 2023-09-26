import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
import { DataContext } from './context/DataContext'
import Footer from './components/Footer'

function App() {
  const [data, setData] = useState(new Map())
  const [cart, setCart] = useState(new Map())
  window.history.scrollRestoration = 'auto'

  // useEffect(() => {
  //   console.log('data:', data)
  // }, [data])

  // useEffect(() => {
  //   console.log('cart updated')
  // }, [cart])

  return (
    <div className='page'>
      <Header cartLength={cart.size} />
      <main className='container'>
        <DataContext.Provider value={ [[data, setData], [cart, setCart]] }>
          <Outlet />
        </DataContext.Provider>
      </main>
      <Footer />
    </div>
  )
}

export default App
