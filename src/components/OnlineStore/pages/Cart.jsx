import {React, useContext} from "react";
import { CartContext } from "../CartProvider"
import { StyleContext } from "../StyleProvider";
import ProductCard from "../ProductCard";
import "../../../styles/category.css"
function Cart() {
    const { cartItems, removeFromCart,updateQuantity } = useContext(CartContext);
    const {theme} = useContext(StyleContext);
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div class={`${theme}-theme`}>
            <h2>Cart</h2>
            <div class="catalog-wrap">
            {cartItems.length === 0 ? (
                <p>The cart is empty yet :</p>
            ) : (
                <ul class="catalog-wrap">
                    {cartItems.map(item => 

                        (<ProductCard actionDesc={"remove"} product={item} action ={removeFromCart}>
                            <button onClick={() => updateQuantity(item, item.quantity - 1)}> - </button>
                            {item.quantity}
                            <button onClick={() => updateQuantity(item, item.quantity + 1)}> + </button>
                            </ProductCard>
                        ))}
                </ul>
            )
        }</div>
            <h2>Final price: {total.toFixed(2)}$</h2>
            
        </div>
    )
}
export default Cart;