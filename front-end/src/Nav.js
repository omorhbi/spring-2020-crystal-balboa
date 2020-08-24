import React from 'react';
import './navBar.css'
import { Link, useHistory } from 'react-router-dom';
import Logo from './images/supperwhereS1.png';

const Nav = () => {
	const history = useHistory();

	const handleSubmit = (event) => {
		localStorage.removeItem('jwtToken');
		console.log('JWT Removed. Logging out.');
		history.push('/');
	}

	return (
		<nav className="nav-Links">
		<img src={Logo} className="navImg"/>
		<div className="dropdown">
		    <button class="dropbtn">Navigate ▾</button>
				<div className="dropdown-content">
				<div><Link to='/profile' className="navLink">Profile</Link></div>
				<div><Link to='/meal_history' className="navLink">Meal History</Link></div>
				<div><Link to='/preferences' className="navLink">Preferences</Link></div>
				<div><Link to='/location/show' className="navLink">Search</Link></div>
				</div>
		</div>
		<button id="logout" type="submit" onClick={handleSubmit}>Log Out</button>
		</nav>
	)
}

export default Nav;