import React,{useEffect,useState} from 'react'
import "./Profile.css";
import PostDetail from './PostDetail';

export default function Profile() {
 
  const [pic,setPic]=useState([])
  const [show,setShow]=useState(false);
  const [posts,setPosts]=useState([])

  
   
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

 




  useEffect(()=>{
    fetch("/myposts",{
      headers:{
      Authorization: "Bearer " + localStorage.getItem("jwt")

    }
  })
  .then(res=>res.json())
  .then((result)=>{
    setPic(result)
    console.log(pic)
  })


  },[])


  return(

   <div className='profile'>
      {/*Profile frame*/}
      <div className='profile-frame'>
         {/*Profile pic*/}
      <div className='profile-pic'>
        <img src="https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=1771&auto=
      format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>



      </div>
       {/*Profile-data*/}
       

      
      </div>
<hr style={{
  width:"90%",
  opacity:"0.8",
  margin:"25px auto"
  
}}/>
  {/*Gallery */}
  <div className='gallery'>
    {pic.map((pics)=>{
      return <img key={pics._id} src={pics.photo} alt=""
      onClick={()=>{
        toggleDetails(pics)
      }
      }
      className='item'></img>

    })}
   
  </div>

  {show &&
  <PostDetail item={posts} toggleDetails={toggleDetails} />
  }
 </div> 
  );

}
