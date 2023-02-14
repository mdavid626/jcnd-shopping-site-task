import React from 'react';
import { useShoppingCart } from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import './shopping-cart.css';

const ShoppingCart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [shoppingCart] = useShoppingCart();
  return (
    <div className="ShoppingCart">
      <div className="ShoppingCart-header">Shopping Cart</div>
      <div className="ShoppingCart-content">
        {shoppingCart.length > 0 ? (
          <div className="ShoppingCart-items">
            {shoppingCart.map((item) => (
              <div key={item.productId}>{item.productId}</div>
            ))}
          </div>
        ) : (
          <div>Your shopping cart is empty</div>
        )}
      </div>
      <div onClick={() => onClose()} className="ShoppingCart-close">
        close
      </div>
    </div>
  );
};

export default ShoppingCart;
