import {React, useContext, useState, useEffect} from "react";
import SupabaseContext from "../SupabaseContext"
import { Link, useNavigate } from "react-router-dom";
import { StyleContext } from "../StyleProvider";
import { AuthContext } from "../AuthContext";

// const products = [
//     {id: 1, name: "Dog Food", price: "$20"},
//     {id: 2, name: "Cat Toy", price: "$5"},
//     {id: 3, name: "Fish Tank", price: "$50"}
// ]

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
                console.log(supabase);
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
    
    if (loading) {
        return <div>Loading...</div>
    }
    if(isAuth){
    return (
        
        <div class={`${theme}-theme`}>
            <h1>Catalog</h1>
            <ul>
                {categories.map(category => (
                    
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name} - {category.price}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )}
    navigate("/login")
    return ( <>NeedAuth</>)
}

export default Catalog;