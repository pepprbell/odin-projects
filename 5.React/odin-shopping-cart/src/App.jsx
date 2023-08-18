import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
import { DataContext } from './context/DataContext'

function App() {
  const [data, setData] = useState(new Map())
  const [cart, setCart] = useState(new Map())

  useEffect(() => {
    console.log('data:', data)
    console.log('cart:', cart)
  }, [data, cart])

  return (
    <>
      <Header cartLength={cart.size} />
      <main className='container'>
        <DataContext.Provider value={ [[data, setData], [cart, setCart]] }>
          <Outlet />
        </DataContext.Provider>
      </main>
    </>
  )
}

export default App
