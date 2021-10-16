import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductsListPage from "./pages/ProductsListPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/cart" component={ShoppingCartPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/products/categories/:category"
            component={ProductsListPage}
          />
          <Route path="/products/:slug" component={ProductDetails} />

          <Route path="/products" component={ProductsListPage} />

          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
