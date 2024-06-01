import logo from "./logo.svg";
import React, { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import React,{createContext,useState} from "react";

import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./screens/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./screens/Createpost";
import { LoginContext } from "./context/LoginContext";
import Mappp from './components/Mappp';
import Chat from './components/Chat';
import { LoginContext } from './context/LoginContext';
import Modal from "./components/Modal";
import UserProfie from "./components/UserProfile";
import MyFolliwngPost from "./screens/MyFollowingPost";




function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
    <div className="App">

      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
      <Navbar login={userLogin}/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} /> 
      <Route path="/profile" element={<Profile />} />
      <Route path="/createPost" element={<Createpost/>} />
      <Route path="/addpins" element={<Mappp/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/createPost" element={<Createpost />}></Route>
      <Route path="/profile/:userid" element={<UserProfie />}></Route>
      </Routes>

    
    <ToastContainer theme="dark"/>
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }
      </LoginContext.Provider>
   
        </div>
        </BrowserRouter>
    

  );
}

export default App;