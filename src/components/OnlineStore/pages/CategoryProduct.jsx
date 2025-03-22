import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SupabaseContext from "../SupabaseContext";
import { CartContext } from "../CartProvider";
import { StyleContext } from "../StyleProvider";
import ProductCard from "../ProductCard";
import "../../../styles/category.css"
function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [loading, setLoading] = useState(true);
    const supabase = useContext(SupabaseContext);
    const {theme} = useContext(StyleContext);
    const { addToCart } = useContext(CartContext);
    
    useEffect(() => {
        async function fetchCategories() {
            try {
                const {data, error} = await supabase
                    .from('categories')
                    .select("*")
                    .eq("id", id)
                if (error) {
                    console.error("Error fetching categories:", error)
                } else {
                    setCategoryName(data[0].name)
                }
    
            } catch (err) {
                console.error("Error fetching categories:", err)
            } finally {
                setLoading(false)
            }
        }
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
            console.error("Error fetching products:", error);});
        fetchCategories().catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, [id, supabase]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!products || products.length === 0) {
        return <p>No products found in this category.</p>;
    }

    return (
        <div class={`${theme}-theme`}>
            <h4>{categoryName}</h4>
            <ul class="catalog-wrap">
                {products.map(product => (
                    <ProductCard actionDesc={"Add to cart"} product={product} action={addToCart}/>
                ))}
            </ul>
        </div>
    )
}

export default CategoryProducts;