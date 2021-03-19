import React from "react";
import products from "../products";
import Product from "../components/shared/Product";

const Home = () => {
  return (
    <div className="container">
      <h1>Latest Products</h1>
      <div className="products">
        {products.map((product, index) => {
          return <Product key={`product-${index}`} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
