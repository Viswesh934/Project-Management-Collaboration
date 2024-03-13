import React from 'react'
import HomePage from './Components/Homepage/HomePage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
  )
}

export default App
