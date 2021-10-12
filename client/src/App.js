import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
