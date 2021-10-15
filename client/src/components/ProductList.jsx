import { React, useState, useEffect } from 'react'
import devProducts from "../dev-data/products.js";
import Product from "./Product";


const ProductList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProducts(devProducts);
  }, []);

  return (
    <>
      {products ? (
        <div className="products-container">
          {products.map((product) => {
            return (
              <Product
                key={Math.floor(Math.random() * (1000 - 1 + 1)) + 1}
                product={product}
              />
            );
          })}
        </div>
      ) : (
        <p>Loading Data</p>
      )}
    </>
  )
}

export default ProductList
