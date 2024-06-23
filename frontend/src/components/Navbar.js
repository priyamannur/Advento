import React, { useContext } from "react";
import logo from "../img/logo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar"
export default function Navbar({ login }) {
  const navigate = useNavigate()
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
        <Sidebar/>
          <button className="seedha"><Link to="/profile">
            <li>Profile</li>
          </Link>
          </button>
          <button className="seedha"><Link to="/createPost">Create Post</Link></button>
          <button className="seedha"> <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Following
          </Link></button>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="" onClick={()=>{navigate("/")}} />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}