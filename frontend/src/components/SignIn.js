import React,{useState,useContext} from 'react';
import "../css/SignIn.css";
import logo from "../img/logo.png"; 
import { Link,useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

export default function SignIn() {
   const{setUserLogin}=useContext(LoginContext)

    const navigate =useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

     //Tost functions
   const notifyA =(msg)=> toast.error(msg)
   const notifyB =(msg)=> toast.success(msg)

   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = ()=>{    
        //checking email
        if(!emailRegex.test(email)){
           notifyA("Invalid email")
           return 
        }

        
            //Sending data to server
            fetch("/signin",{
              method:"post",
              headers:{
                 "Content-Type":"application/json"
              },
              body:JSON.stringify({
                 email:email,
                 password:password
        
              })
        
            }).then(res=>res.json())
            .then(data=>{
              if(data.error){
                 notifyA(data.error)
              }else{
                 notifyB("Signed In Successfully")
                 localStorage.setItem("jwt",data.token)
                 localStorage.setItem("user",JSON.stringify(data.user))
                 localStorage.setItem("username",(data.user.userName))
                 console.log(localStorage.getItem("username"))
                 setUserLogin(true)
                 navigate("/")
              }
            })
        
        
           }
        


  return (
    <div className='signIn'>
        <div>
            <div className='loginForm'>
            <img className='signUplogo' src={logo} alt=""/>
            
            <div>
        <input type='email' name="email" id="email" 
        placeholder='Email' value={email} onChange={(e)=>
         {setEmail(e.target.value)}}/>
     </div>

     <div>
     <input type='password' name="password" id="password"
        placeholder='Password' value={password} onChange={(e)=>
         {setPassword(e.target.value)}}/>
     </div>

     <input type='submit' id="login-btn" onClick={()=>{postData()}} value="Sign In"/>
    </div>

    <div className='loginForm2'>
       Don't have an account ?
       <Link to="/signup">
       <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
       </Link>
       <div>
       <Link to="/Forgotpass">
       <span style={{color:"blue",cursor:"pointer", fontSize:"15px"}}>Forgot Password</span>
       </Link>
       </div>
    </div>
        </div>
    </div>
);
}
