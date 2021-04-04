import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { FaTimes, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, deleteSuccess]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEditUser = (id) => {
    history.push(`/user/${id}/edit`);
  };

  return (
    <div className="container">
      <h1>Users</h1>
      {loading ? (
        <Loader text="Fetching users" />
      ) : error ? (
        <Message text={error} error />
      ) : (
        <table className="full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="id">#{user._id}</td>
                <td className="name">{user.name}</td>
                <td className="email">{user.email}</td>
                <td className={user.isAdmin ? "admin true" : "admin false"}>
                  {user.isAdmin ? <FaCheck /> : <FaTimes />}
                </td>
                <td className="actions">
                  <button
                    className="icon edit"
                    onClick={() => handleEditUser(user._id)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className="icon delete"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaRegTrashAlt />
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

export default UserList;
