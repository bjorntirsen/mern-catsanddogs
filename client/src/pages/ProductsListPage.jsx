import React from "react";
import ProductList from "../components/ProductList";

const ProductsListPage = (props) => {
  const path = props.match.url;
  let category = null;
  if (path.split("/")[3]) {
    category = path.split("/")[3];
  }
  return (
    <>
      <ProductList category={category} />
    </>
  );
};

export default ProductsListPage;
