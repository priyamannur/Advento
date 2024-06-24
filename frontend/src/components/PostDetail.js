import React, { useState } from "react";
import "../css/PostDetail.css";
import { toast } from "react-toastify";

export default function PostDetail({ item, toggleDetails, updatePostDetails }) {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(item.comments); // Separate state for comments

  // Toast functions
  const notifyB = (msg) => toast.success(msg);

  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "PUT",
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
        setComments(result.comments); // Update comments state
        setComment("");
        notifyB("Comment posted");
        updatePostDetails(result); // Update the parent component
      });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Do you really want to delete this comment?")) {
      fetch(`/deleteComment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setComments(result.comments); // Update comments state
          notifyB("Comment deleted");
          updatePostDetails(result); // Update the parent component
        });
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          {/* card header */}
          <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
            <div className="card-pic">
              <img
                src={item.postedBy.Photo ? item.postedBy.Photo : picLink}
                alt=""
              />
            </div>
            <div>
              <h5>{item.postedBy.name}</h5>
            </div>
            <div className="card-content">
              <p>{item.likes.length} Likes</p>
            </div>
          </div>
          {/* commentSection */}
          <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
            {comments.map((comment) => (
              <p className="comm" key={comment._id}>
                <span className="commenter" style={{ fontWeight: "bolder" }}>
                  {comment.postedBy.name}:
                </span>
                <span className="commentText">{comment.comment}</span>
                <span
                  className="deleteComment"
                  onClick={() => deleteComment(comment._id)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </span>
              </p>
            ))}
          </div>
          {/* card content */}
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
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="comment"
              onClick={() => makeComment(comment, item._id)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => toggleDetails(null)}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
}
