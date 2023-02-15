import React from 'react';
import {
  usePlaceOrder,
  useShoppingCart,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { ShoppingCartItem } from '../../types/shopping-cart';
import ShoppingCartListItem from '../shopping-cart-list-item/shopping-cart-list-item';
import './shopping-cart.css';

const calculateTotal = (shoppingCart: ShoppingCartItem[]) =>
  shoppingCart.reduce((acc, item) => acc + item.product.price * item.amount, 0);

const ShoppingCart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [shoppingCart] = useShoppingCart();
  const [placeOrder, isPlacingOrder] = usePlaceOrder();
  const handlePlaceOrderClick = async () => {
    await placeOrder();
    onClose();
  };
  return (
    <div className="ShoppingCart">
      <div className="ShoppingCart-header">Shopping Cart</div>
      <div className="ShoppingCart-content">
        {shoppingCart.length > 0 ? (
          <div className="ShoppingCart-items">
            {shoppingCart.map((item) => (
              <ShoppingCartListItem
                key={item.product.id}
                shoppingCartItem={item}
              />
            ))}
          </div>
        ) : (
          <div>Your shopping cart is empty</div>
        )}
      </div>
      {shoppingCart.length > 0 && (
        <div className="ShoppingCart-total" data-testid="ShoppingCart-total">
          Total: {calculateTotal(shoppingCart).toFixed(2)} EUR
        </div>
      )}
      <div className="ShoppingCart-actions">
        <div onClick={() => onClose()} className="ShoppingCart-close">
          close
        </div>
        {shoppingCart.length > 0 && !isPlacingOrder && (
          <div
            onClick={handlePlaceOrderClick}
            className="ShoppingCart-placeOrder"
          >
            Place order
          </div>
        )}
        {isPlacingOrder && (
          <div className="ShoppingCart-placeOrder">Placing order...</div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
