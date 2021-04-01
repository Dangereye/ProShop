import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import StarRating from "../components/products/StarRating";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  return (
    <>
      {loading ? (
        <Loader text="Fetching details.." />
      ) : error ? (
        <Message text={error} error={true} />
      ) : (
        <div className="container">
          <button
            className="btn back small light"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
          <div className="sidebar-grid">
            <div className="content">
              <div className="product-details">
                <img src={product.image} alt={product.name} />
                <div className="product-details__text">
                  <h2>{product.name}</h2>
                  <StarRating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  <div className="product__price">£{product.price}</div>
                  <p className="product__description">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              <div className="sidebar__details">
                <SidebarGroup label="Price" value={`£${product.price}`} />
                <SidebarGroup
                  label="Status"
                  value={product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                />
                <SidebarGroup label="Available" value={product.countInStock} />
                {product.countInStock > 0 && (
                  <SidebarGroup
                    label="Qty"
                    value={
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    }
                  />
                )}
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="dark block"
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
