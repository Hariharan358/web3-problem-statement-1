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




function App() {
  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<Login />} />
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