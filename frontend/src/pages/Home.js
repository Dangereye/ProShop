import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/products/Product";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="container">
      <h1>Latest Products</h1>
      {keyword && <p>Results matching {keyword}</p>}
      {loading ? (
        <Loader text="Fetching products.." />
      ) : error ? (
        <Message text={error} error={true} />
      ) : (
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
