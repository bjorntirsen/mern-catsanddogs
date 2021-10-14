import { React, useState, useEffect } from "react";
import Product from "../components/Product";
import devProducts from "../dev-data/products.js";
import Hero from "../components/Hero";
export default function LandingPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setProducts(devProducts);
  }, []);
  return (
    <div>
      <Hero />
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
    </div>
  );
}

