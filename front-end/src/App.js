import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';
import Preferences from './preferences';
import Location from './location';
import LocationShow from './LocationShow';
import Login_and_Signup from './login_and_signup';
import Signup from './signup';
import Meal_History from './meal_history';
import Mistake from './mistake';
import SearchPreferences from './searchPreferences';
import Edit_History from './edit_history';
import SearchShow from './searchShow';
import Nav from './Nav';
import Profile from './profile';
import Delete_History from './delete_history';

const App = () => {
	//Add components in switch
	return(
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Welcome />
					</Route>
					<Route exact path="/preferences">
						<Nav />
						<Preferences />
          			</Route>
					<Route exact path="/location/show">
						<Nav />
						<LocationShow />
					</Route>
					<Route exact path="/login" >
						<Login_and_Signup />
					</Route> 
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/meal_history">
						<Nav />
						<Meal_History />
					</Route>
					<Route exact path="/mistake">
						<Mistake />
					</Route>
					<Route exact path = "/profile">
						<Nav />
						<Profile />
					</Route>
				</Switch>

			</Router>
		</div>
	);
};

export default App;