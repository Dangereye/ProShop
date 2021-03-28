import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import ShoppingCart from "../components/shared/ShoppingCart";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return parseFloat((num * 100) / 100).toFixed(2);
  };

  const itemsQty = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2)
  );
  const taxPrice = addDecimals(0.2 * itemsPrice);
  const shippingPrice = 4.99;
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  const handlePlaceOrder = () => {
    console.log("Order placed");
  };
  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Order Confirmation</h1>
      <div className="sidebar-grid">
        <div className="content">
          <section>
            <h2>Shipping Address</h2>
            <p>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode.toUpperCase()},{" "}
              {cart.shippingAddress.country}
            </p>
          </section>
          <section>
            <h2>Payment Method</h2>
            <p>{cart.paymentMethod}</p>
          </section>
          <section>
            <h2>Order Items</h2>
            {cart.cartItems.length > 0 ? (
              <ShoppingCart />
            ) : (
              <Message text="Your cart is empty" />
            )}
          </section>
        </div>
        <div className="sidebar">
          <div className="sidebar__details">
            <h3>Order Summary</h3>
            <SidebarGroup label="Items" value={itemsQty} />
            <SidebarGroup label="Price" value={`£${itemsPrice}`} />
            <SidebarGroup label="Tax" value={`£${taxPrice}`} />
            <SidebarGroup label="Shipping" value={`£${shippingPrice}`} />
            <SidebarGroup label="Total" value={`£${totalPrice}`} />
          </div>
          <button
            type="button"
            className="dark block"
            disabled={cart.cartItems.length === 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
