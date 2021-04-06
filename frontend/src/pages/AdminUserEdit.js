import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const AdminUserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, dispatch, userId, user, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="container">
      <button className="btn back small light" onClick={() => history.goBack()}>
        Go Back
      </button>
      <div className="form-container">
        <h1>Edit user</h1>
        {loadingUpdate && <Loader text="Updating.." />}
        {errorUpdate && <Message text={errorUpdate} error />}
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
