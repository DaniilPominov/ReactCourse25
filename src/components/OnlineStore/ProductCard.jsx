import { React} from "react";
import "../../styles/card.css"
function ProductCard(props){
    const product = props.product;
    const addToCart = props.action;
    return (
        <li key={product.id} class="category-item">
            <img src={product.product_img} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
    )
}
export default ProductCard;