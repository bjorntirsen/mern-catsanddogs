import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCreateProductsPage from "./pages/AdminCreateProductsPage";
import AdminEditProductPage from "./pages/AdminEditProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminEditOrderPage from "./pages/AdminEditOrderPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/getMe`;
        const obj = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, obj);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        setUser(responseData.data.user);
      }
    };
    fetchUser().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/cart" component={ShoppingCartPage} />
          <Route path="/orders" component={UserOrdersPage} exact />
          <Route path="/orders/:id" component={OrderDetailsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/products" component={ProductsListPage} exact />
          <Route
            path="/products/categories/:category"
            component={ProductsListPage}
          />
          <Route path="/products/:slug" component={ProductDetailsPage} />
          <Route path="/admin/products" component={AdminProductsPage} exact />
          <Route
            path="/admin/products/create"
            component={AdminCreateProductsPage}
            exact
          />
          <Route
            path="/admin/products/:slug"
            component={AdminEditProductPage}
          />
          <Route path="/admin/orders" component={AdminOrdersPage} exact />
          <Route path="/admin/orders/:id" component={AdminEditOrderPage} />
        </Switch>
      </div>
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
