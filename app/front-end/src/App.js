import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Welcome from './welcome';

const App = () => {
	//Add components in switch
	return(
		<div className="App">
			<Router>
				<Switch>
					<Route path="/">
						<Welcome />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;