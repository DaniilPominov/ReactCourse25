import {React, useContext} from "react";
import { CartContext } from "../CartProvider"
import { StyleContext } from "../StyleProvider";
import ProductCard from "../ProductCard";

function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const {theme} = useContext(StyleContext);
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div class={`${theme}-theme`}>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>The cart is empty yet :(</p>
            ) : (
                <ul>
                    {cartItems.map(item => 
                        (<ProductCard actionDesc={"remove"} product={item} action ={removeFromCart}/>
                        ))}
                </ul>
            )
        }
            <h2>Final price: {total.toFixed(2)}$</h2>
        
        </div>
    )
}
export default Cart;