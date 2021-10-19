import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsListPage from "./pages/ProductsListPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      setUser(true);
    }
  });

  return (
    <div>
      <Navbar user={user} />
      <div className="container">
        <Switch>
          <Route path="/cart" component={ShoppingCartPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/products/categories/:category"
            component={ProductsListPage}
          />
          <Route path="/products/:slug" component={ProductDetailsPage} />
          <Route path="/products" component={ProductsListPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
