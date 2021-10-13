import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import ProductsListPage from "./pages/ProductsListPage";

function App() {
  return (
    <div>
      <div className="container">
        <Switch>
          <Route
            path="/products/category/:category"
            component={ProductsListPage}
          />
          {/*Will change this when component is ready*/}
          <Route path="/products/:slug" component={ProductsListPage} />

          <Route path="/products" component={ProductsListPage} />

          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
