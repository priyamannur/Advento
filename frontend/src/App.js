
import React,{createContext,useState} from "react";

import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Createpost from './components/Createpost';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mappp from './components/Mappp';
import Chat from './components/Chat';
import { LoginContext } from './context/LoginContext';
import Modal from "./components/Modal";



function App() {
  const [userLogin,setUserLogin]=useState(false)
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
      </Routes>

    
    <ToastContainer theme="dark"/>
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }
      </LoginContext.Provider>
   
        </div>
        </BrowserRouter>
    

  );
}

export default App;
