import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';
import Location from './location';
import LocationShow from './LocationShow';
import Login_and_Signup from './login_and_signup';
import Signup from './signup';
import Meal_History from './meal_history';
import Mistake from './mistake';
import SearchShow from './searchShow';
import SearchPreferences from './searchPreferences';

const App = () => {
	//Add components in switch
	return(
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Welcome />
					</Route>
					<Route exact path="/location">
						<Location />
					</Route>
					<Route exact path="/location/show">
						<LocationShow />
					</Route>
					<Route exact path="/login" >
						<Login_and_Signup />
					</Route> 
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/meal_history">
						<Meal_History />
					</Route>
					<Route exact path="/mistake">
						<Mistake />
					</Route>
					<Route exact path = "/searchPreferences">
						<SearchPreferences />
					</Route>
					<Route exact path = "/searchPreferences/show">
						<SearchShow />
					</Route>
				</Switch>

			</Router>
		</div>
	);
};

export default App;