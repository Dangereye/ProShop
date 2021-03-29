import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const ShoppingCart = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="shopping-cart">
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item__details">
            <Link to={`/product/${item.id}`}>
              <h3>{item.name}</h3>
            </Link>
            <div className="cart-item__details__group">
              <div>£{item.price}</div>
              <div>
                <select
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart(item.id, e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="cart-delete"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
