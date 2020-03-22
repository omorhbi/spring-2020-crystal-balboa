import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';
import Location from './Location';
import LocationShow from './LocationShow';

const App = () => {
	//Add components in switch
	return(
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Welcome />
					</Route>
					<Route exact path="/location">
						<Location />
					</Route>
					<Route exact path="/location/show">
						<LocationShow />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;