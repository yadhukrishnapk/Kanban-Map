import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Kanban/Home/Home'
import CalendarComponent from './components/Calender/CalenderComponent'

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path='/cal' element={<CalendarComponent />} ></Route>
    </Routes>
    </Router>
  )
}

export default App