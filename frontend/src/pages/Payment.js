import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/shipping/CheckoutSteps";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="container">
      <div className="form-container">
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <form onSubmit={handleSubmit}>
          <h2>Select Method </h2>
          <div className="radio-group">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            />
            <label htmlFor="PayPal">PayPal</label>
          </div>
          <button type="submit" className="dark medium">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
