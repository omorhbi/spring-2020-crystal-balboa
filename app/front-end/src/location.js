import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './location.css';
import { Link } from 'react-router-dom';

const handleSubmit = (event) => {
}

const Location = () => {
	return(
		<div className="location">
			<h1 id="locationAbout">Discover the best restaurants near you.</h1>
			<div className="searchBar">
            <form onSubmit={handleSubmit}>
				<input type="text" id="locSearchBar" name="locSearch" placeholder="Enter a location"/>
				<input type="text" id="restSearchBar" name="restSearch" placeholder="Search for restaurants"/>
				<Link to={{pathname: "/location/show", state: {restaurant: "hi"}}} name=""><button type="submit" id="locSearchBTN">Search</button></Link>
			</form>
            </div>
		</div>
	);
}

export default Location;