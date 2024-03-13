import React from 'react'
import HomePage from './HomePage'
import LoginForm from './MemberLogin'
import SignupForm from './Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
  )
}

export default App
