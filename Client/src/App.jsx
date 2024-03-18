import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Homepage/HomePage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ResourcesPage from './Components/ResourcePage/ResourcePage';
import ContactUs from './Components/ContactUs/ContactUs';
import Community from './Components/Community/Community';
import MessageApp from './Components/ChatApp/MessageApp';
import ProjectsList from './Components/Projects/ProjectsList';
import Dashboard from './Components/Dashboard';
import ProjectIdeasList from './Components/ProjectIdeas/ProjectIdeasList';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projectideas" element={<ProjectIdeasList />} />
        <Route path="/chat" element={<MessageApp />} />
      </Routes>
    </div>
  );
}

export default App;
