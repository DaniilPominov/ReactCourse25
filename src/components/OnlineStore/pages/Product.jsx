import React, { useContext, useEffect, useState } from "react";
import "../../../styles/theme-styles.css";
import { useParams } from "react-router-dom";
import SupabaseContext from "../SupabaseContext";
import { CartContext } from "../CartProvider";
import { StyleContext } from "../StyleProvider";

function Product() {
    const {id} = useParams();
    const [product, setProduct] = useState(0);
    const [loading, setLoading] = useState(true);
    const supabase = useContext(SupabaseContext);
    const { addToCart } = useContext(CartContext);
    const {theme} = useContext(StyleContext);
    
    useEffect(() => {
            async function fetchProducts() {
                
                try {
                    const { data, error } = await supabase
                        .from('products')
                        .select('*')
                        .eq('id', id);
                    
                        if (error) {
                        console.error(error);
                    } else {
                        setProduct(data[0]);
                    }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
            
            }
            fetchProducts().catch((error) => {
                console.error("Error fetching products:", error);
            });
        }, [id, supabase]);
        if(loading){
            return <div>Loading...</div>
        }
    return (
        <div className={`${theme}-theme`}>
            <h2>{product.name}</h2>
            <img src={product.product_img} alt={product.name} />
            <p>О товаре: {product.description}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => addToCart(product)}>add to cart</button>
        </div>
    )
}

export default Product;