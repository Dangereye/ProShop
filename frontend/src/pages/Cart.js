import React from "react";
import { useSelector } from "react-redux";
import Message from "../components/shared/Message";
import SidebarGroup from "../components/sidebar/SidebarGroup";
import ShoppingCart from "../components/shared/ShoppingCart";

const Cart = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="sidebar-grid">
        <div className="content">
          {cartItems.length === 0 ? (
            <Message text="Your cart is empty." />
          ) : (
            <ShoppingCart />
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
      </div>
    </div>
  );
};

export default Cart;
