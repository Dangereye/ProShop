import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { addToCart } from "../actions/cartActions";
import StarRating from "../components/products/StarRating";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import SidebarGroup from "../components/sidebar/SidebarGroup";
import Dates from "../components/shared/Dates";
import Meta from "../components/shared/Meta";

const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview;

  useEffect(() => {
    if (successReview && !formError) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview, rating, comment, formError]);

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  const handleWriteReview = (e) => {
    e.preventDefault();
    setFormError(null);
    if (rating === 0) {
      setFormError("Please add a rating");
    } else if (comment === "") {
      setFormError("Please add a comment");
    } else {
      dispatch(createProductReview(match.params.id, { rating, comment }));
    }
  };

  return (
    <>
      {loading ? (
        <Loader text="Fetching product details." />
      ) : error ? (
        <Message text={error} error={true} />
      ) : (
        <>
          <Meta title={product.name} />
          <div className="container">
            <button
              className="btn back small light"
              onClick={() => history.goBack()}
            >
              Go Back
            </button>
            <div className="sidebar-grid">
              <div className="content">
                <section className="product-details">
                  <img src={product.image} alt={product.name} />
                  <div className="product-details__text">
                    <h2>{product.name}</h2>
                    <StarRating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <div className="product__price">£{product.price}</div>
                    <p className="product__description">
                      {product.description}
                    </p>
                  </div>
                </section>
                <section className="product-reviews">
                  <h2>Customer Reviews</h2>
                  <div className="reviews">
                    {loadingReview && (
                      <Loader text="Fetching customer reviews" />
                    )}
                    {product.reviews.length === 0 ? (
                      <Message text="No product reviews yet." />
                    ) : (
                      product.reviews.map((review) => (
                        <div key={review._id} className="review">
                          <h3>{review.name}</h3>
                          <Dates date={review.createdAt} long />
                          <StarRating value={review.rating} />
                          <p>{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <h2>Write a review</h2>
                  {formError && <Message text={formError} error />}
                  {errorReview && <Message text={errorReview} error />}
                  {userInfo ? (
                    <form className="review-form" onSubmit={handleWriteReview}>
                      <div className="input-group">
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(+e.target.value)}
                        >
                          <option value="0">Select your rating</option>
                          <option value="0.5">Awful</option>
                          <option value="1">Very poor</option>
                          <option value="1.5">Poor</option>
                          <option value="2">Below average</option>
                          <option value="2.5">Average</option>
                          <option value="3">Above average</option>
                          <option value="3.5">Good</option>
                          <option value="4">Very good</option>
                          <option value="4.5">Excellent</option>
                          <option value="5">Outstanding</option>
                        </select>
                      </div>
                      <div className="textarea-group">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="medium dark">
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message text="Login to write a review" />
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <div className="sidebar">
                <div className="sidebar__details">
                  <SidebarGroup label="Price" value={`£${product.price}`} />
                  <SidebarGroup
                    label="Status"
                    value={
                      product.countInStock > 0 ? "In Stock" : "Out Of Stock"
                    }
                  />
                  <SidebarGroup
                    label="Available"
                    value={product.countInStock}
                  />
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
