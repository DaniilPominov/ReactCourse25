import {React, createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map((item) =>
                item.id === product.id? {...item, quantity: item.quantity + 1} : item));
        } else {
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }
    }
    const updateQuantity = (product, newQuantity) => {
        if(newQuantity<=0){
            removeFromCart(product);
            return;
        }
        setCartItems(cartItems.map((item) =>
            item.id === product.id? {...item, quantity: newQuantity} : item
        )
        );
    }

    const removeFromCart = (product) => {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider