import React, { useState } from 'react';
import Avatar from '../../assets/avatar.svg';
import Cart from '../../assets/cart.svg';
import Logo from '../../assets/logo.png';
import Modal from '../modal/modal';
import ShoppingCart from '../shopping-cart/shopping-cart';
import './header.css';

const Header: React.FC = () => {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  return (
    <div className="Header">
      <div className="Header-logoAndTitle">
        <img src={Logo} className="Header-logo" alt="logo" />
        <div className="Header-title">Simple Shopping Site</div>
      </div>
      <div className="Header-avatarAndUser">
        <img src={Avatar} className="Header-avatar" alt="avatar" />
        <div className="Header-user">Max Pecu</div>
      </div>
      <img
        src={Cart}
        className="Header-cart"
        alt="cart"
        onClick={() => setIsShoppingCartOpen(true)}
      />
      {isShoppingCartOpen && (
        <Modal>
          <ShoppingCart onClose={() => setIsShoppingCartOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
