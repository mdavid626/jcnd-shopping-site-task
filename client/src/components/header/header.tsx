import React from 'react';
import Avatar from '../../assets/avatar.svg';
import Cart from '../../assets/cart.svg';
import Logo from '../../assets/logo.png';
import './header.css';

const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header-logoAndTitle">
        <img src={Logo} className="Header-logo" alt="logo" />
        <div className="Header-title">Simple Shopping Site</div>
      </div>
      <div className="Header-avatarAndUser">
        <img src={Avatar} className="Header-avatar" />
        <div className="Header-user">Max Pecu</div>
      </div>
      <img src={Cart} className="Header-cart" />
    </div>
  );
};

export default Header;
