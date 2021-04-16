import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import LoaderFullScreen from "../components/shared/LoaderFullScreen";
import Message from "../components/shared/Message";

const AdminProductEdit = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [history, dispatch, productId, product, successUpdate]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      })
    );
  };

  return (
    <div className="container">
      {loadingUpdate && <LoaderFullScreen />}
      {errorUpdate && <Message text={errorUpdate} error />}
      {loading ? (
        <LoaderFullScreen />
      ) : error ? (
        <Message text={error} error={true} />
      ) : (
        <>
          <button
            className="btn back small light"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
          <div className="form-container">
            <h1>Edit Product</h1>
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
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="textarea-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  resize="none"
                />
              </div>
              <div className="input-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  placeholder="/images/default.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input type="file" id="upload" onChange={handleFileUpload} />
                {uploading && <LoaderFullScreen />}
              </div>
              <div className="input-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="countInStock">Count in stock</label>
                <input
                  type="number"
                  id="countInStock"
                  placeholder="Enter count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <button type="submit" className="medium dark">
                Update
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductEdit;
