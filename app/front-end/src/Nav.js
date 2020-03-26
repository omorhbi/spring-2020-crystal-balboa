import React from 'react';
import './navBar.css'
import { Link } from 'react-router-dom';
import Logo from './images/supperwhereS1.png';

const Nav = () => {
	return (
		<nav className="nav-Links">
		<img src={Logo} className="navImg"/>
		<div className="dropdown">
		    <button class="dropbtn">Navigate ▾</button>
				<div className="dropdown-content">
				<div><Link to='/profile' className="navLink">Profile</Link></div>
				<div><Link to='/meal_history' className="navLink">Meal History</Link></div>
				<div><Link to='/preferences' className="navLink">Preferences</Link></div>
				<div><Link to='/searchPreferences' className="navLink">Preferences Search</Link></div>
				<div><Link to='/location' className="navLink">Search</Link></div>
				</div>
		</div>
		</nav>
	)
}

export default Nav;