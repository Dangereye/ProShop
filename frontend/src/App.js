import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import AdminUserList from "./pages/AdminUserList";
import AdminProductList from "./pages/AdminProductList";
import AdminUserEdit from "./pages/AdminUserEdit";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/admin/userlist" component={AdminUserList} />
            <Route path="/admin/productlist" component={AdminProductList} />
            <Route path="/admin/user/:id/edit" component={AdminUserEdit} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={Order} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
