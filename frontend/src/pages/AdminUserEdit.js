import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const AdminUserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <button className="btn back small light" onClick={() => history.goBack()}>
        Go Back
      </button>
      <div className="form-container">
        <h1>Edit user</h1>
        {loading ? (
          <Loader text="One moment please.." />
        ) : error ? (
          <Message text={error} error={true} />
        ) : (
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
            <div className="checkbox-group">
              <input
                id="admin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor="admin">Is Admin?</label>
            </div>

            <button type="submit" className="medium dark">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminUserEdit;
