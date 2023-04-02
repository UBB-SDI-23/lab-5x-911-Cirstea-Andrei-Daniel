import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CarModelShowAll } from './components/cars/CarsShowAll'

function App() {
  return (
    <div className="App">
      <h1>Car Dealership</h1>
      <CarModelShowAll></CarModelShowAll>
    </div>
  )
}

export default App
