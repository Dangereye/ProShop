import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import Message from "../components/shared/Message";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import ShoppingCart from "../components/shared/ShoppingCart";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const PlaceOrder = ({ history }) => {
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

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Order Confirmation</h1>
      {error && <Message text={error} error={true} />}
      <div className="sidebar-grid">
        <div className="content">
          <section>
            <h2>Shipping Address:</h2>
            <p>{cart.shippingAddress.address},</p>
            <p>{cart.shippingAddress.city},</p>
            <p>{cart.shippingAddress.postalCode.toUpperCase()},</p>
            <p>{cart.shippingAddress.country}.</p>
          </section>
          <section>
            <h2>Payment Method:</h2>
            <p>{cart.paymentMethod}</p>
          </section>
          <section>
            <h2>Items:</h2>
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
            <SidebarGroup label="Items price" value={`£${itemsPrice}`} />
            <SidebarGroup label="Tax" value={`£${taxPrice}`} />
            <SidebarGroup label="Shipping" value={`£${shippingPrice}`} />
            <SidebarGroup label="Total price" value={`£${totalPrice}`} />
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
