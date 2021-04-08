import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { FaTimes } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import Dates from "../components/shared/Dates";

const UserProfile = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage(null);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="container">
      <div className="profile-grid">
        <div className="form-container">
          <h2>User Profile</h2>
          {loading && <Loader text="Fetching user" />}
          {message && <Message text={message} error={true} />}
          {success && <Message text="Profile updated." success={true} />}
          {error && <Message text={error} error={true} />}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm password</label>
              <input
                type="password"
                id="password2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="medium dark">
              Update
            </button>
          </form>
        </div>
        <div className="orders">
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader text="Fetching orders" />
          ) : errorOrders ? (
            <Message text={errorOrders} error />
          ) : (
            <table className="split">
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td className="created">
                      <Dates date={order.createdAt} />
                    </td>
                    <td className="price">£{order.totalPrice}</td>
                    <td className={order.isPaid ? "paid true" : "paid false"}>
                      {order.isPaid ? (
                        <Dates date={order.paidAt} />
                      ) : (
                        <FaTimes />
                      )}
                    </td>
                    <td
                      className={
                        order.isShipped ? "shipped true" : "shipped false"
                      }
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
      </div>
    </div>
  );
};

export default UserProfile;
