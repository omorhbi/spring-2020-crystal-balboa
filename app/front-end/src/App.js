import React from 'react';
import logo from './logo.svg';
import './App.css';
import desktopBg from './images/deskWelcome.png';
import mobileBg from './images/mobileWelcome.png';

const App = () => {
	let image;
	if(window.innerWidth >= 650){
		image = desktopBg;
	}
	else{
		image = mobileBg;
	}
	return (
		<div className="welcome" style={{backgroundImage: `url(${image})` }}>
			<div className="welcome-text">
				<h1>"What will I eat for dinner?"</h1>
				<p>Supperwhere is an application to help you figure out dining recommendations based on your dietary preferences and meal history. 
				Supperwhere aims to make the dining experience more convenient for you by providing quick and easy options that are tailored to your preferences.
				</p>
			</div>
		</div>
	);
};

export default App;