import { React} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/card.css"
function ProductCard(props){
    const product = props.product;
    const addToCart = props.action;
    const actionDesc = props.actionDesc;
    const path = "/products/"+product.id;
    const altImage = "https://p16-pu-sign-useast8.tiktokcdn-us.com/tos-useast5-p-0068-tx/d1a3063e05db47979e30e53b3d1cc0e8_1713410670~tplv-photomode-share-play.jpeg?lk3s=b59d6b55&x-expires=1743120000&x-signature=6TAVtuCzJoWWpwhB5bxN9yWW4rc%3D&shp=b59d6b55&shcp=-"
    return (
        <li key={product.id} class="category-item">
            <Link to={path} params={{action: addToCart}}>
            <img src={product.product_img??altImage} alt={product.name} />
                        <h2>{product.name}</h2>
                        </Link>
                        <p>Price: ${product.price}</p>
                        
                        <button onClick={() => addToCart(product)}>{actionDesc}</button>
                        <p>{props.children}</p>
                    </li>
                    
    )
}
export default ProductCard;