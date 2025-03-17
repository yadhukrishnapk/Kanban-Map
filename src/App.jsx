import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Kanban/Home/Home'
import CalendarComponent from './components/Calender/CalenderComponent'
import { Sample } from './components/samplee/Sample'

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path='/cal' element={<CalendarComponent />} ></Route>
      <Route path='/sample' element={<Sample />} ></Route>
    </Routes>
    </Router>
  )
}

export default App