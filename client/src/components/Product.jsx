import React from "react";
export default function Product({product}) {
	return (
		<div className="product-container">
            <h2>{product.title}</h2>
            <img src={product.imageUrl} alt={`${product.title}`} />
            <h4>Price: {product.price}</h4>
            <p>{product.description}</p>
            <hr />
            <p>Weight: {product.weight}</p>
            <p>Maker: {product.maker}</p>
        </div>
	);
}