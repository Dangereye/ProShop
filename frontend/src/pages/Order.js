import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import OrderedProducts from "../components/shared/OrderedProducts";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const Order = ({ match }) => {
  let itemsQty;
  let itemsPrice;
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const addDecimals = (num) => {
    return parseFloat((num * 100) / 100).toFixed(2);
  };

  if (order) {
    itemsQty = order.orderItems.reduce((acc, item) => acc + item.qty, 0);
    itemsPrice = addDecimals(
      order.orderItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2)
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  return loading ? (
    <Loader text="One moment please" />
  ) : error ? (
    <Message text={error} error={true} />
  ) : (
    <div className="container">
      <h1>Order #{order._id}</h1>
      <div className="sidebar-grid">
        <div className="content">
          <section>
            <h2>Shipping Address:</h2>
            <p>{order.user.name}</p>
            <p>{order.shippingAddress.address},</p>
            <p>{order.shippingAddress.city},</p>
            <p>{order.shippingAddress.postalCode.toUpperCase()},</p>
            <p>{order.shippingAddress.country}.</p>
            {order.isDelivered ? (
              <Message text={`Delivered on ${order.deliveredAt}`} success />
            ) : (
              <Message text="Not delivered" error />
            )}
          </section>
          <section>
            <h2>Payment Method:</h2>
            <p>{order.paymentMethod}</p>
            {order.isPaid ? (
              <Message text={`Paid on ${order.paidAt}`} success />
            ) : (
              <Message text="Not paid" error />
            )}
          </section>
          <section>
            <h2>Items:</h2>
            <OrderedProducts />
          </section>
        </div>
        <div className="sidebar">
          <div className="sidebar__details">
            <h3>Order Summary</h3>
            <SidebarGroup label="Items " value={itemsQty} />
            <SidebarGroup label="Items price" value={`£${itemsPrice}`} />
            <SidebarGroup label="Tax" value={`£${order.taxPrice}`} />
            <SidebarGroup label="Shipping" value={`£${order.shippingPrice}`} />
            <SidebarGroup label="Total price" value={`£${order.totalPrice}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
