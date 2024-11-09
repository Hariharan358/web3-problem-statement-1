import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import './App.css'
import Navbar from './navbar';
import InsuranceDashboard from './dashboard';
import InsuranceApplication from './insurance-application';
import ApplicationStatus from './application-status';
import InsurancePlans from './insurance_plans';
import HomePage from './home';
import AboutUs from './aboutus';




function App() {
  return (
    
    <Router>
      <Navbar></Navbar>
      
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<InsuranceDashboard/>} />
            <Route path="/application" element={<InsuranceApplication/>} />
            <Route path="/status" element={<ApplicationStatus/>} />
            <Route path="/plans" element={<InsurancePlans/>} />
          </Routes>
        
    </Router>
  );
}

export default App;