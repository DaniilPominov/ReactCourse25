import { React} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/card.css"
function ProductCard(props){
    const product = props.product;
    const addToCart = props.action;
    const actionDesc = props.actionDesc;
    const path = "/products/"+product.id;
    return (
        <li key={product.id} class="category-item">
            <Link to={path} params={{action: addToCart}}>
            <img src={product.product_img} alt={product.name} />
                        <h2>{product.name}</h2>
                        </Link>
                        <p>Price: ${product.price}</p>
                        
                        <button onClick={() => addToCart(product)}>{actionDesc}</button>
                    </li>
    )
}
export default ProductCard;