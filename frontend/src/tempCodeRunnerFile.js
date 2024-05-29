import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'; // Corrected component name
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Home from './components/Home';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">  
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
