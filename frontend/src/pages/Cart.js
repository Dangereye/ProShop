import React from "react";
import { addToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCart = () => {
    console.log("Item removed");
  };

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="container container__sidebar">
      <div className="content">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message text="Your cart is empty." />
        ) : (
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
                        onChange={(e) =>
                          dispatch(addToCart(item.id, e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="cart-delete" onClick={removeFromCart}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sidebar">
        <div className="sidebar__details">
          <h3>Subtotal</h3>
          <SidebarGroup
            label="Items"
            value={cartItems.reduce((acc, item) => acc + item.qty, 0)}
          />
          <SidebarGroup
            label="Price"
            value={`£${cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}`}
          />
        </div>
        <button
          type="button"
          className="dark block"
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
