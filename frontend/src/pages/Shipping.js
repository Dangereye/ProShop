import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/shipping/CheckoutSteps";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div className="container">
      <div className="form-container">
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <form onSubmit={handleSubmit}>
          <div className="input__group">
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input__group">
            <label htmlFor="name">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="input__group">
            <label htmlFor="name">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="input__group">
            <label htmlFor="name">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="dark medium">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
