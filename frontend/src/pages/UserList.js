import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { FaTimes, FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    console.log(id);
  };

  return (
    <div className="container">
      <h1>Users</h1>
      {loading ? (
        <Loader text="Fetching users" />
      ) : error ? (
        <Message text={error} error />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
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
                <td>
                  <Link
                    to={`/user/${user._id}/edit`}
                    className="btn small dark"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="small danger"
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
