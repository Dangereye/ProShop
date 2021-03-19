import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/shared/Product";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
