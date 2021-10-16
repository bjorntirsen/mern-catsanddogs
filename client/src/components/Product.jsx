import React from "react";
import Button from './Button'
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
            <Button type="primary" text="Add to Cart" />
            <Button type="primary" text="Primary"/>
            <Button type="secondary" text="Secondary"/>
            <Button text="Button"/>
        </div>
	);
}