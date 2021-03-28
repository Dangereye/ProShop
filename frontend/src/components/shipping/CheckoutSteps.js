import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkout-steps">
      <div className="checkout-steps__step">
        {step1 ? (
          <Link to="/login" className="text-link">
            Sign In
          </Link>
        ) : (
          <Link to="/login" disabled>
            Sign In
          </Link>
        )}
      </div>
      <div className="checkout-steps__step">
        {step2 ? (
          <Link to="/shipping" className="text-link">
            Shipping
          </Link>
        ) : (
          <Link to="/shipping" disabled>
            Shipping
          </Link>
        )}
      </div>
      <div className="checkout-steps__step">
        {step3 ? (
          <Link to="/payment" className="text-link">
            Payment
          </Link>
        ) : (
          <Link to="/payment" disabled>
            Payment
          </Link>
        )}
      </div>
      <div className="checkout-steps__step">
        {step4 ? (
          <Link to="/placeorder" className="text-link">
            Place Order
          </Link>
        ) : (
          <Link to="/placeorder" disabled>
            PlaceOrder
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
