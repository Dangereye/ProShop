import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/shared/Product";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Latest Products</h1>
      {loading && <p>Just a moment..</p>}
      {error && <p>{error}</p>}
      {products && (
        <div className="products">
          {products.map((product, index) => {
            return <Product key={`product-${index}`} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
