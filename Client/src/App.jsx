import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import cors from 'cors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Assuming ologin is a component
import SignUp from './SignUp';

import HomePage from './HomePage'; 

const App = () => {
  return (
    
      <div>
        <Routes>
          <Route exact path="/" element={
            <div>    
          <HomePage />
          </div>
          } />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
  );
};

export default App;
