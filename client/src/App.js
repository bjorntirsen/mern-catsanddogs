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
import AdminProductsPage from "./pages/AdminProductsPage";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = "/api/users/getMe";
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
          <Route path="/cart" component={ShoppingCartPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminProductsPage} />
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
    </UserContext.Provider>
  );
}

export default App;
