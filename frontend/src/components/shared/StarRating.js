import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = ({ value, text }) => {
  return (
    <div className="product__rating">
      <span className="product__rating__star">
        {value >= 1 ? (
          <BsStarFill />
        ) : value >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="product__rating__star">
        {value >= 2 ? (
          <BsStarFill />
        ) : value >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="product__rating__star">
        {value >= 3 ? (
          <BsStarFill />
        ) : value >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="product__rating__star">
        {value >= 4 ? (
          <BsStarFill />
        ) : value >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="product__rating__star">
        {value >= 5 ? (
          <BsStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>

      <span className="product__rating__text">{text}</span>
    </div>
  );
};

export default StarRating;
