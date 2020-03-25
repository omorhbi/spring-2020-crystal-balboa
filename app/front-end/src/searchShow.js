import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './searchShow.css';
import { Link } from 'react-router-dom';
// import Preferences from './preferences'; // what props will be based off

const SearchShow = (props) => { // props will come from the state variables in preferences.js
	const [restaurants, setRestaurants] = useState([]);
    // hard coded preferences but will act differently once preferences are saved
    // to a database
    const [preferences, setPreferences] = useState([]);

	useEffect(() => {
       console.log('fetching restaurants...');
       // temp api data
       axios("https://my.api.mockaroo.com/my_saved_schema.json?key=dc49f260")
        .then(response => {
            setRestaurants(response.data);
            const filter = response.data.filter(restaurant => 
                preferences.includes(restaurant.cuisine));
            setRestaurants(filter);
            // props.culinaryPreferences and props.priceRange would serve as the variables
            // to compare here for filtering.
        })
        .catch(err => {
            console.log("No more requests allowed today.")
            console.log(err);

            const backupRestaurants = [
                {
                    id: 1,
                    restaurant_name: "Five Guys",
                    address: "56 W 14th St",
                    neighborhood: "Chelsea",
                    city: "New York",
                    state: "New York",
                    zip_code: "10011",
                    cuisine: "Burger"
                },
                {
                    id: 2,
                    restaurant_name: "Dim Sum Palace",
                    address: "59 2nd Ave",
                    neighborhood: "East Village",
                    city: "New York",
                    state: "New York",
                    zip_code: "10003",
                    cuisine: "Dim Sum"
                }
            ];
            setRestaurants(backupRestaurants);
        }); 
    }, []);

	//Temporary restaurant pictures and restaurant data for now, taken from mockaroo and picsum
	return(
		<div className="searchShow">
			<div className="searchShowTop">
				<h1 id="searchShowAbout">Search for restaurants based on your preferences.</h1>
				<div className="abtSearchBar">
					<input type="text" id="prefAbtSearchBar" name="prefAbtSearch" placeholder="Enter a location"/>
					<input type="text" id="restAbtSearchBar" name="restAbtSearch" placeholder="Search for restaurants"/>
					<Link to="/searchPreferences/show"><button type="submit" id="prefAbtSearchBTN">Search</button></Link>
				</div>
			</div>
			<div className="prefRestList">
				{restaurants.map(item => (
					<div className="prefRestCard" key={item.id}>
						<a href={`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}, ${item.state} ${item.zip_code}`} target="_blank" className="topRightDir">Directions</a>
						<img src={`https://picsum.photos/200?id=${item.restaurant_name}`} className="prefRestCardImg"/>
						<div className="restNameList">{item.restaurant_name}</div>
						{item.address}<br />
						{item.city}, {item.state}, {item.zip_code}<br />
					</div>
				))}
			</div>
		</div>
	);
}

export default SearchShow;