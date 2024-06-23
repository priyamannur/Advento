import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {Link} from "react-router-dom"
import { SearchBox } from '@mapbox/search-js-react';

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  
const [address,setAddress] = useState("");

  const OnSelected = (res)=>{
    const place_name = res.features[0].properties.name;
    setAddress(place_name); 
    // Fetching all posts
    fetch(`/place?q=${place_name !== undefined ? place_name: ""}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  };
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }

    // Fetching all posts
    fetch("http://localhost:3000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
    
        setData(result);
      })
      .catch((err) => console.log(err));
  },[]);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // function to make comment
  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: comment,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    <>
      <div className="searchbox">
      <SearchBox accessToken={'pk.eyJ1IjoicHJpeWFtYW5udXIiLCJhIjoiY2x3Z2sxZmg5MDY2ODJxbW13cW0wYzJ6aCJ9.T7bKfVcPe9VNfplLnZM2EA'}
      value={address}
      onRetrieve={OnSelected}/>
      </div>
    <div className="home">
    
      {/* card */}
      
      {data.map((posts) => {
        return (
          <div className="posts-container">
          <div className="card" key={posts._id}>
            {/* card header */}
            <div className="card-header">
            <h3 style={{aligntext:"centre"}}>{posts.location}</h3>
              {/* <div className="card-pic">
                <img
                  src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                  alt=""
                />
              </div> */}
              <div>
              {/* <div><h5>
                <Link style={{color:"black"}} to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5></div> */}
              
              <div></div>
            </div>
            </div>
            {/* card image */}
            <div className="card-image">
              <img  onClick={() => {
                  toggleComment(posts);
                }} src={posts.photo} alt="" />
            </div>

            {/* card content */}
             <div className="card-content">
              {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite
                </span>
              )}
              <p>{posts.likes.length} Likes</p></div>
              {/*
              <p>{posts.body} </p>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
            </div> */}
            {/* add Comment */}
            {/* <div className="add-comment" >
              <span className="material-symbols-outlined">mood</span>
              <input 
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts._id);
                }}
              >
                Post
              </button>
            </div> */}
          </div>
          </div>
        );
      })}
    
      {/* show Comment*/}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=1771&auto=
                    format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <div><h5>
                <Link style={{color:"black"}} to={`/profile/${item.postedBy._id}`}>
                  {item.postedBy.name}
                </Link>
              </h5></div> 
                <div className="card-content">
              {item.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  favorite
                </span>
              )}
              <p>{item.likes.length} Likes</p>
              </div>
              </div>
              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm" key={comment._id}>
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>
              {/* card content*/ }
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>
              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div> 
      )}
      </div>
      </>
  );
}
