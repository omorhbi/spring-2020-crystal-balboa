import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';
import Location from './location';
import LocationShow from './LocationShow';
import SearchShow from './searchShow';
import SearchPreferences from './searchPreferences';
import Profile from './profile';
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
					<Route exact path = "/searchPreferences">
						<SearchPreferences />
					</Route>
					<Route exact path = "/searchPreferences/show">
						<SearchShow />
					</Route>
					<Route exact path = "/profile">
						<Profile />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;