import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRating from "../components/products/StarRating";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <div className="container container__sidebar">
      <div className="content">
        <Link className="btn back small light" to="/">
          Go Back
        </Link>
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
          <div className="sidebar__group">
            <span>Price</span>
            <span>£{product.price}</span>
          </div>
          <div className="sidebar__group">
            <span>Status</span>
            <span>
              {product.countInStock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>
        </div>

        <button className="dark block" disabled={product.countInStock === 0}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
