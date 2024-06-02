import React,{useState,useEffect} from 'react';
import "../css/Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '@mapbox/search-js-react';

export default function Createpost() {
  const[body,setBody] =useState("");
  const [image,setImage]=useState("");
  const[url,setUrl]=useState("");
const [address,setAddress] = useState("");
  const navigate=useNavigate()
const userr = localStorage.getItem("username")
  //Tost functions
  const notifyA =(msg)=> toast.error(msg)
  const notifyB =(msg)=> toast.success(msg)

  const OnSelected = (res)=>{
    const place_name = res.features[0].properties.name;
    setAddress(place_name);
  };

  useEffect(()=>{
     //saving post to mongodb
     if(url){
      fetch("http://localhost:5000/createPost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:url,
        address
      })
     }).then(res=>res.json())
     .then(data=>{if(data.error){
      notifyA(data.error)
     }else{
      notifyB("Successfully Posted")
      navigate("/")
     }})
     .catch(err=>console.log(err))


     }

     
  },[url, address])


 // posting image to cloudinary
  const postDetails=()=>{
    console.log(body,image)
    const data =new FormData();
    data.append("file",image)
    data.append("upload_preset","Advento")
    data.append("cloud_name","adventotravelapp")
    fetch("https://api.cloudinary.com/v1_1/adventotravelapp/image/upload",
    {
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err))
    console.log(url)

    


  }



  const loadfile = (event) => {
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src); // free memory
    }
  };

  return (
    <div className='createPost'>
      {/* header */}
      <div className='post-header'>
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
      </div>
      <div>
      <label>Add location</label>
      <SearchBox accessToken={'pk.eyJ1IjoicHJpeWFtYW5udXIiLCJhIjoiY2x3Z2sxZmg5MDY2ODJxbW13cW0wYzJ6aCJ9.T7bKfVcPe9VNfplLnZM2EA'}
      value={address}
      onChange={address}
      onRetrieve={(res)=>OnSelected(res)}/>
      </div>
      {/* image preview */}
      <div className='main-div'>
        <img id="output" src="https://th.bing.com/th/id/OIP.iZeMQOgfKWTWjtqeX8hjCwAAAA?rs=1&pid=ImgDetMain" alt="" />
        <input type="file" accept="image/*" onChange={(event) => { loadfile(event);
          setImage(event.target.files[0])
         }} />
      </div>

      {/* details */}
      <div className='details'>
        <div className='card-header'>
          <div className='card-pic'>
            <img src="https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <h5></h5>
        </div>
        
        
        <textarea value={body} onChange={(e)=>{
          setBody(e.target.value)
        }} type="text" placeholder='Write a caption....'
          ></textarea>



      </div>
    </div>
  );
}
