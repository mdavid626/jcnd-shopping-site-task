import React, { useState } from 'react';
import Cart from '../../assets/cart.svg';
import Modal from '../modal/modal';
import ShoppingCart from '../shopping-cart/shopping-cart';
import './shopping-cart-button.css';

const ShoppingCartButton: React.FC = () => {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  return (
    <>
      <img
        src={Cart}
        className="ShoppingCartButton"
        alt="cart"
        onClick={() => setIsShoppingCartOpen(true)}
      />
      {isShoppingCartOpen && (
        <Modal>
          <ShoppingCart onClose={() => setIsShoppingCartOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default ShoppingCartButton;
