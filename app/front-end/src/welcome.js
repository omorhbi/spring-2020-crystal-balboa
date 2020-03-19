import React from 'react';
import './welcome.css';
import desktopBg from './images/deskWelcome2.png';
import logo from './images/supperwhere1.png';

const Welcome = () => {
	const image = desktopBg;
	return (
		<div className="welcome" style={{backgroundImage: `url(${image})` }}>
			<img src={logo} id="welcome-logo"/>
			<div id="welcome-login"><button type="button" id="login-button">Login/Register</button></div>
			<div className="welcome-text">
				<h1>"What should I eat for dinner?"</h1>
				<p>Supperwhere is an application to help you figure out dining recommendations based on your dietary preferences and meal history. 
				Supperwhere aims to make the dining experience more convenient for you by providing quick and easy options that are tailored to your preferences.
				</p>
			</div>
		</div>
	);
};

export default Welcome;