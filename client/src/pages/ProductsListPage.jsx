import React from "react";

import ProductList from "../components/ProductList";

const ProductsListPage = ({ match }) => {
  const path = match.url;
  let category = null;
  if (path.split("/")[3]) {
    // eslint-disable-next-line prefer-destructuring
    category = path.split("/")[3];
  }
  return (
    <>
      <ProductList category={category} />
    </>
  );
};

export default ProductsListPage;
