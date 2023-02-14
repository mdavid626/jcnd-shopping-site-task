import React from 'react';
import Avatar from '../../assets/avatar.svg';
import Logo from '../../assets/logo.png';
import ShoppingCartButton from '../shopping-bar-button/shopping-cart-button';
import './header.css';

const Header: React.FC = () => (
  <div className="Header">
    <div className="Header-logoAndTitle">
      <img src={Logo} className="Header-logo" alt="logo" />
      <div className="Header-title">Simple Shopping Site</div>
    </div>
    <div className="Header-avatarAndUser">
      <img src={Avatar} className="Header-avatar" alt="avatar" />
      <div className="Header-user">Max Pecu</div>
    </div>
    <ShoppingCartButton />
  </div>
);

export default Header;
