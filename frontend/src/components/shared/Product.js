import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/product/${product._id}`}>
        <img
          className="product__image"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="product__body">
        <Link to={`/product/${product._id}`}>
          <h3 className="product__title">{product.name}</h3>
        </Link>
        <StarRating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
        <div className="product__price">£{product.price}</div>
      </div>
    </div>
  );
};

export default Product;
