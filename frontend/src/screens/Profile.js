import React, { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";
import "../css/Profile.css";
import ProfilePic from "../components/ProfilePic";

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (post) => {
    setCurrentPost(post);
    setShow(!show);
  };

  const changeProfile = () => {
    setChangePic(!changePic);
  };

  const updatePostDetails = (updatedPost) => {
    setPic((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
    setCurrentPost(updatedPost);
  };

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics) => (
          <img
            key={pics._id}
            src={pics.photo}
            onClick={() => toggleDetails(pics)}
            className="item"
            alt=""
          />
        ))}
      </div>
      {show && currentPost && (
        <PostDetail item={currentPost} toggleDetails={toggleDetails} updatePostDetails={updatePostDetails} />
      )}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
