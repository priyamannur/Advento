import React from 'react';
import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';

function Sidebar(){
  return (
    <Menu>
      <a className="menu-item" href="/addpins">
        Add Pins
      </a>
      <a className="menu-item" href="/chat">
        AI chat
      </a>
      <a className="menu-item" href="/aboutus">
        About us
      </a>
      <a className="menu-item" href="/help">
        Help
      </a>
    </Menu>
  );
};

export default Sidebar