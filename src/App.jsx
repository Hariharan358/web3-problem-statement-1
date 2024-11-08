import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import './App.css'
import Navbar from './navbar';
import InsuranceDashboard from './dashboard';




function App() {
  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<InsuranceDashboard/>} />
          </Routes>
        
    </Router>
  );
}

export default App;