import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import 'mapbox-gl/dist/mapbox-gl.css';
import StarIcon from '@mui/icons-material/Star';
import "./Mappp.css"
import axios from "axios"
const moment = require('moment')



function Mappp() {
  const currentUser = "safak"
  const [pins, setPins] = useState([]);
  const [currentPlaceId,setCurrentPlaceId] = useState(null);
  const [newPlace,setNewPlace] = useState(null);
  const [title,setTitle] = useState(null);
  const [desc,setDesc] = useState(null);
  const [rating,setRating] = useState(0);
  useEffect(()=>{
    const getPins = async()=>{
      try{
        const res = await axios.get("/addpins")
        console.log("Pins fetched:", res.data);
        setPins(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    getPins();
  },[])

  const handleMarkerClick = (id) =>{
      setCurrentPlaceId(id);
  };
  const handleAddClick = (e)=>{
  const lng = e.lngLat.lng
  const lat = e.lngLat.lat
  setNewPlace({
    lat,
    lng
  })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      lng : newPlace.lng
    }
    try {
      const res = await axios.post("/addpins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    } catch (error) {
      
    }
  }

  return <Map
    mapboxAccessToken="pk.eyJ1IjoicHJpeWFtYW5udXIiLCJhIjoiY2x3Z2sxZmg5MDY2ODJxbW13cW0wYzJ6aCJ9.T7bKfVcPe9VNfplLnZM2EA"
    initialViewState={{
      longitude: 46,
      latitude: 17,
      zoom: 8
    }}
    style={{ width: "100vw", height: "100vh",
    transition: {
      "duration": 300,
      "delay": 0
    }
     }}
    mapStyle="mapbox://styles/priyamannur/clwjp2ule00tf01r06x262her"
    onDblClick={handleAddClick}
    
  >
   
    {pins.map(p=>(
      <>
    <Marker longitude={p.lng} latitude={p.lat} anchor='bottom' >
      <RoomIcon style={{ fontSize: 30, color: p.username===currentUser ? "slateblue" : "tomato" }} 
      onClick= {()=>handleMarkerClick(p._id)}
      />
    </Marker>
    
    {p._id === currentPlaceId && (
    <Popup longitude={p.lng} latitude={p.lat}
      anchor="left"
      closeOnClick = {false}
      closeButton = {true}
      onClose={() => setCurrentPlaceId(null)}
     >  
      <div className="card">
        <label>Place</label><h4 className="place">{p.title} </h4>
        <label>Review</label><p className='p.desc'>{p.desc} </p>
        <label>Rating</label>
        <div className="stars">
          {Array(p.rating).fill(<StarIcon className="star" />)}
          
        </div>

        <div>
          <label>Information</label>
          <div>
            <span className="username">Created by <b>{p.username} </b></span></div>
          <div><span className="date">{moment(p.createdAt).fromNow()}</span></div>
        </div>
      </div>
  </Popup>
  )}
  </>
))}

{newPlace && (
<Popup longitude={newPlace.lng} latitude={newPlace.lat}
      anchor="left"
      closeOnClick = {false}
      closeButton = {true}
      onClose={() => setNewPlace(null)}
     >
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input placeholder='Enter Place Name' onChange={(e)=>setTitle(e.target.value)}></input>
        <label>Review</label>
        <textarea placeholder='Your Review?' onChange={(e)=>setDesc(e.target.value)}></textarea>
        <label>Rating</label>
        <select onChange={(e)=>setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="submitButton" type="submit">Add pin</button>
      </form>
     </Popup>
)}
  </Map>;
}
export default Mappp