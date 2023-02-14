import React from 'react';
import shoppingCartContext from '../../contexts/shopping-cart-context/shopping-cart-context';
import {
  useAddToShoppingCart,
  useRemoveFromShoppingCart,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { ShoppingCartItem } from '../../types/shopping-cart';
import './shopping-cart-list-item.css';

const ShoppingCartListItem: React.FC<{
  shoppingCartItem: ShoppingCartItem;
}> = ({ shoppingCartItem }) => {
  const addToShoppingCart = useAddToShoppingCart();
  const removeFromShoppingCart = useRemoveFromShoppingCart();
  return (
    <div className="ShoppingCartListItem">
      <div className="ShoppingCartListItem-product">
        <div className="ShoppingCartListItem-name">
          {shoppingCartItem.product.name}
        </div>
        <div>Price: {shoppingCartItem.product.price.toFixed(2)} EUR</div>
        <div>Amount: {shoppingCartItem.amount}</div>
        <div>
          {(shoppingCartItem.product.price * shoppingCartItem.amount).toFixed(
            2
          )}{' '}
          EUR
        </div>
      </div>
      <div className="ShoppingCartListItem-actions">
        <div
          onClick={() => addToShoppingCart(shoppingCartItem.product)}
          className="ShoppingCartListItem-button"
        >
          Add more
        </div>
        <div
          onClick={() => removeFromShoppingCart(shoppingCartItem.product)}
          className="ShoppingCartListItem-button"
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartListItem;
