import {React, useContext, useState, useEffect, lazy} from "react";
import SupabaseContext from "../SupabaseContext"
import { Link, useNavigate } from "react-router-dom";
import { StyleContext } from "../StyleProvider";
import { AuthContext } from "../AuthContext";
//import Category from "../Category";
import "../../../styles/category.css"
const Category = lazy(() => import("../Category"))
function Catalog() {
    const navigate = useNavigate();
    const {isAuth, setAuth} = useContext(AuthContext);
    const {theme} = useContext(StyleContext);
    const supabase = useContext(SupabaseContext)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchCategories() {
            try {
                const {data, error} = await supabase
                    .from('categories')
                    .select("*");
                if (error) {
                    console.error("Error fetching categories:", error)
                } else {
                    setCategories(data)
                }

            } catch (err) {
                console.error("Error fetching categories:", err)
            } finally {
                setLoading(false)
            }

        }
        fetchCategories().catch((err) => {
            console.error("Error fetching categories:", err)
            setLoading(false)
        })
    }, [supabase])
    
    // if (loading) {
    //     return <div>Loading...</div>
    // }
    if(isAuth){
    return (
        <>
        
        <div class={`${theme}-theme`}>
        <h1>Catalog</h1>
            <ul class="catalog-wrap">
                {categories.map(category => (
                    
                    <Category category={category}/>
                ))}
            </ul>
        </div>
        </>
    )}
    navigate("/login")
    return ( <>NeedAuth</>)
}

export default Catalog;