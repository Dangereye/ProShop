import React from "react";
import { useSelector } from "react-redux";

const OrderedItems = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  return (
    <div className="shopping-cart">
      {order.orderItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item__details">
            <h3>{item.name}</h3>
            <div className="cart-item__details__group">
              <div>£{item.price}</div>
              <div>x {item.qty}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderedItems;
