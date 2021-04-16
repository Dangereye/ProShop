import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Pagination from "../components/products/Pagination";
import Product from "../components/products/Product";
import ProductCarousel from "../components/products/ProductCarousel";
import LoaderFullScreen from "../components/shared/LoaderFullScreen";
import Message from "../components/shared/Message";
import Meta from "../components/shared/Meta";

const Home = ({ match, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className="container">
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <button
            className="btn back small light"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
        )}

        {loading ? (
          <LoaderFullScreen />
        ) : error ? (
          <Message text={error} error={true} />
        ) : (
          <>
            <h1>Latest Products</h1>
            {keyword && <p>Results matching {keyword}</p>}
            <div className="products">
              {products.map((product, index) => {
                return <Product key={`product-${index}`} product={product} />;
              })}
            </div>
            <Pagination pages={pages} page={page} keyword={keyword} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
