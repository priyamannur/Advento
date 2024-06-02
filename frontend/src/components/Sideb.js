import React from "react";
import { IoIosMenu } from "react-icons/io";
import { RiChatNewFill } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";
import { IoMdHelp } from "react-icons/io";
import "../App.css"
const Sideb = ({ recentPrompts }) => {
  return (
    <div className="sidebar">
      <div className="top">
        <IoIosMenu />
        <div className="recentChats">
          <p className="recentTitle">Recent</p>
          {recentPrompts.map((prompt, index) => (
            <div key={index} className="recentEntry">
              <p><CiChat1 /> {prompt}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="bottemItem Help">
          <p><IoMdHelp /> Help</p>
        </div>
      </div>
    </div>
  );
}

export default Sideb;
