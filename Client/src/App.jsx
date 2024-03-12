import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import cors from 'cors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './ologin'; // Assuming ologin is a component
import Signup from './osignup'; // Assuming osignup is a component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
