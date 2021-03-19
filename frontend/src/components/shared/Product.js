import React from "react";
import { Link } from "react-router-dom";

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
        <div className="product__rating">
          {product.rating} from {product.numReviews} reviews.
        </div>
        <div className="product__price">£{product.price}</div>
      </div>
    </div>
  );
};

export default Product;
