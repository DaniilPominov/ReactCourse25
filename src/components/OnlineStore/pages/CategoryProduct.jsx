import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import SupabaseContext from "../SupabaseContext";
import { CartContext } from "../CartProvider";
import { StyleContext } from "../StyleProvider";
import '../../../styles/CategoryProduct.scss'

function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const supabase = useContext(SupabaseContext);
    const {theme} = useContext(StyleContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        async function fetchProducts() {
            
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category_id', id);
                
                    if (error) {
                    console.error(error);
                } else {
                    setProducts(data);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!products || products.length === 0) {
        return <p>No products found in this category.</p>;
    }

    return (
        <div class={`${theme}-theme category-products`}>
            <h1>Products in Category {id}</h1>
            <ul>
                {products.map(product => (
                    <li class="product-item"
                        key={product.id}>
                        <img src={product.product_img}></img>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryProducts;