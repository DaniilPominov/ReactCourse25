import {React, useContext} from "react";
import { CartContext } from "../CartProvider"

function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>The cart is empty yet :(</p>
            ) : (
                <ul>
                    {cartItems.map(item => 
                        (<li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.price} * {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                        ))}
                </ul>
            )
        }
            <h2>Final price: {total.toFixed(2)}$</h2>
        
        </div>
    )
}
export default Cart;