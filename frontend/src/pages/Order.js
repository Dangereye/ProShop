import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import OrderedProducts from "../components/shared/OrderedProducts";
import SidebarGroup from "../components/sidebar/SidebarGroup";

const Order = ({ match }) => {
  let itemsQty;
  let itemsPrice;
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

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
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  const handleSuccessPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader text="Fetching order" />
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
          {!order.isPaid && (
            <>
              {loadingPay && <Loader text="Connecting" />}
              {!sdkReady ? (
                <Loader text="Connecting" />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
