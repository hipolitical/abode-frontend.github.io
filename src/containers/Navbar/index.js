import React from 'react';
import './navbar.css';
import LogoImg from '../../assets/logo.svg'

function Navbar() {
  return (
    <div className="navbar-container">
      <img src={LogoImg} alt='logo' />
    </div>
  );
}

export default Navbar;
