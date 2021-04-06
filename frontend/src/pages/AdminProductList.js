import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

const AdminProductList = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEditProduct = (id) => {
    history.push(`/admin/product/${id}/edit`);
  };

  const handleAddProduct = () => {
    dispatch(createProduct());
  };

  return (
    <div className="container">
      <div className="flex-group">
        <h1>Products</h1>
        <button className="icon-text edit medium" onClick={handleAddProduct}>
          <FaPlus />
          <span>Create</span>
        </button>
      </div>
      {loadingDelete && <Loader text="Deleting product" />}
      {errorDelete && <Message text={errorDelete} error />}
      {loadingCreate && <Loader text="Building product" />}
      {errorCreate && <Message text={errorCreate} error />}
      {loading ? (
        <Loader text="Fetching products" />
      ) : error ? (
        <Message text={error} error />
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="id">#{product._id}</td>
                <td className="name">{product.name}</td>
                <td className="price">£{product.price}</td>
                <td className="category">{product.category}</td>
                <td className="brand">{product.brand}</td>
                <td className="actions">
                  <button
                    className="icon edit"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className="icon delete"
                    onClick={() => handleDeleteProduct(product._id)}
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

export default AdminProductList;
