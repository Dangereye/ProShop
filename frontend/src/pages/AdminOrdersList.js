import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllOrders } from "../actions/orderActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { FaTimes } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import Dates from "../components/shared/Dates";

const AdminOrdersList = ({ history, match }) => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);
  const { loading, error, orders } = allOrders;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    dispatch(listAllOrders());
  }, [dispatch, history, userInfo]);

  return (
    <div className="container">
      <h1>Orders</h1>
      {loading ? (
        <Loader text="Fetching orders" />
      ) : error ? (
        <Message text={error} error />
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Created</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Shipped</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="id">#{order._id}</td>
                <td className="name">{order.user.name}</td>
                <td className="created">
                  <Dates date={order.createdAt} />
                </td>
                <td className="price">£{order.totalPrice}</td>
                <td className={order.isPaid ? "paid true" : "paid false"}>
                  {order.isPaid ? <Dates date={order.paidAt} /> : <FaTimes />}
                </td>
                <td
                  className={order.isShipped ? "shipped true" : "shipped false"}
                >
                  {order.isShipped ? (
                    <Dates date={order.shippedAt} />
                  ) : (
                    <FaTimes />
                  )}
                </td>
                <td className="actions">
                  <button
                    className="icon dark"
                    onClick={() => history.push(`/order/${order._id}`)}
                  >
                    <IoOpenOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrdersList;
