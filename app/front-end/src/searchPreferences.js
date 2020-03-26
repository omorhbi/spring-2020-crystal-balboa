import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './searchPreferences.css';
import { Link } from 'react-router-dom';

const SearchPreferences = () => {
	return(
		<div className="search">
			<h1 id="searchAbout">Discover the best restaurants based on your preferences.</h1>
			<div className="searchBar">
				<input type="text" id="prefSearchBar" name="prefLocSearch" placeholder="Enter a location"/>
				<input type="text" id="prefRestSearchBar" name="prefRestSearch" placeholder="Search for restaurants"/>
				<Link to="/SearchPreferences/show"><button type="submit" id="prefEntBTN">Search</button></Link>
			</div>
		</div>
	);
}

export default SearchPreferences;