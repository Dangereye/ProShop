import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" component={ProductDetails} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
