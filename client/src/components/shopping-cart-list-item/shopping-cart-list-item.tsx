import classnames from 'classnames';
import React from 'react';
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
  const availableInStock =
    shoppingCartItem.product.inStock - shoppingCartItem.amount;
  return (
    <div className="ShoppingCartListItem">
      <div className="ShoppingCartListItem-product">
        <div className="ShoppingCartListItem-name">
          {shoppingCartItem.product.name}
        </div>
        <div className="ShoppingCartListItem-price">
          Price: {shoppingCartItem.product.price.toFixed(2)} EUR
        </div>
        <div className="ShoppingCartListItem-amountColumn">
          <div className="ShoppingCartListItem-amount">
            Amount: {shoppingCartItem.amount}
          </div>
          <div className="ShoppingCartListItem-actions">
            <div
              onClick={() => addToShoppingCart(shoppingCartItem.product)}
              className={classnames('ShoppingCartListItem-button', {
                'ShoppingCartListItem-button--disabled': availableInStock <= 0,
              })}
            >
              add
            </div>
            {'/'}
            <div
              onClick={() => removeFromShoppingCart(shoppingCartItem.product)}
              className="ShoppingCartListItem-button"
            >
              remove
            </div>
          </div>
        </div>
        <div className="ShoppingCartListItem-totalPrice">
          {(shoppingCartItem.product.price * shoppingCartItem.amount).toFixed(
            2
          )}{' '}
          EUR
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartListItem;
