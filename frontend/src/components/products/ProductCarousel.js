import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../shared/Message";
import { listTopRatedProducts } from "../../actions/productActions";
import { FcPrevious, FcNext } from "react-icons/fc";
import LoaderFullScreen from "../shared/LoaderFullScreen";

const ProductCarousel = () => {
  const [currentItem, setCurrentItem] = useState(1);
  console.log("Current Item:", currentItem);
  const [translate, setTranslate] = useState(0);
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.productTopRated);
  const { loading, error, products } = topRatedProducts;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  const handlePreviousItem = () => {
    if (currentItem > 1) {
      setCurrentItem((currentItem) => currentItem - 1);
      setTranslate((translate) => translate + 100);
    }
  };

  const handleNextItem = () => {
    if (currentItem < products.length) {
      setCurrentItem((currentItem) => currentItem + 1);
      setTranslate((translate) => translate - 100);
    }
  };

  const handleJumpTo = (num) => {
    num++;
    console.log(num);
    setCurrentItem(num);
    setTranslate(100 - num * 100);
  };

  return loading ? (
    <LoaderFullScreen />
  ) : error ? (
    <Message text={error} error />
  ) : (
    <div className="product-carousel">
      <div
        className="product-carousel__wrapper"
        style={{
          width: `${products.length * 100}%`,
          transform: `translateX(${translate / products.length}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={`carousel-${product._id}`}
            className="product-carousel__item"
          >
            <div className="product-name">{product.name}</div>
            <div className="product-price">Only £{product.price}</div>
            <Link to={`/product/${product._id}`}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="product-carousel__navigation">
        {products.map((product, index) => (
          <div
            key={`nav-item-${product._id}`}
            className={
              currentItem === index + 1
                ? "product-carousel__navigation__item active"
                : "product-carousel__navigation__item"
            }
            onClick={() => handleJumpTo(index)}
          ></div>
        ))}
      </div>
      <div className="top-rated-label">
        <div>Top</div>
        <div>Rated</div>
      </div>
      <button
        className="product-carousel__button previous"
        onClick={handlePreviousItem}
      >
        <FcPrevious />
      </button>
      <button
        className="product-carousel__button next"
        onClick={handleNextItem}
      >
        <FcNext />
      </button>
    </div>
  );
};

export default ProductCarousel;
