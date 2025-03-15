import React from "react";

import { useParams } from "react-router-dom";

const products = {
    1: {name: "Dog Food", description: "The most delicious", price: "$20"},
    2: {name: "Toy Ball", description: "The best for cats", price: "$5"},
    3: {name: "Fish Tank", description: "Big and comfortable, ur fish will be good", price: "$50"}
}

function Product() {
    const {id} = useParams();
    const product = products[id];

    if (!product) {
        return <h1>Product not found</h1>
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
        </div>
    )
}

export default Product;