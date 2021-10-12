import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<div>
			<div className="container">
				<Switch>
					<Route path="/" component={LandingPage} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
