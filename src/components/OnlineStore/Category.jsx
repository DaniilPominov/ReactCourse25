import { React} from "react";
import "../../styles/category.css"
import { Link } from "react-router-dom";
function Category(props){
    const category = props.category;
    return (
        <li key={category.id} class="category-item">
                        <Link to={`/category/${category.id}`}><div>
                            {category.name} 
                            </div>
                            <div>
                            <img src={category.category_img}></img>
                            </div></Link>
                        
                    </li>
    )
}
export default Category;