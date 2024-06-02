import React from 'react';
import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';

function Sidebar() {
  return (
    <Menu>
      <div className='menubox'>
        <a className="menu-item" href="/addpins">
          Add Pins
        </a>
      </div>
      <div className='menubox'>
        <a className="menu-item" href="/chat">
          AI chat
        </a>
      </div>
      <div className='menubox'>
        <a className="menu-item" href="/">
          Explore
        </a>
      </div>
      <div className='menubox'>
        <a className="menu-item" href="/help">
          Help
        </a>
      </div>
    </Menu>
  );
}

export default Sidebar;
