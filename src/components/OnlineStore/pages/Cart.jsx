import React, { useContext } from "react";
import { CartContext } from "../CartProvider";
import { StyleContext } from "../StyleProvider";
import "../../../styles/Cart.scss";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { theme } = useContext(StyleContext);
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className={`cart ${theme}-theme`}>
      <div className="cart-container container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p className="empty-text">Your cart feels lonely...</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li className="cart-item" key={item.id}>
                  <div className="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="image-placeholder">📦</div>
                    )}
                  </div>
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">
                      ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                    <span className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="summary">
              <div className="total-row">
                <span>Total:</span>
                <span className="total-price">${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;