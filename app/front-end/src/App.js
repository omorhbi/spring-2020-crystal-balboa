import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';
import Preferences from './preferences';

const App = () => {
	//Add components in switch
	return(
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Welcome />
					</Route>
					<Route path="/preferences">
						<Preferences />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;