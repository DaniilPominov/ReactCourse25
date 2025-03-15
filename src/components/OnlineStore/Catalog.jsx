import React from "react";

import { Link } from "react-router-dom";

const products = [
    {id: 1, name: "Dog Food", price: "$20"},
    {id: 2, name: "Cat Toy", price: "$5"},
    {id: 3, name: "Fish Tank", price: "$50"}
]

function Catalog() {
    return (
        <div>
            <h1>Catalog</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name} - {product.price}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Catalog;