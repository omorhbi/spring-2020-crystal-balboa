import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './LocationShow.css';
import { Link } from 'react-router-dom';

const LocationShow = (props) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
       console.log('fetching restaurants...');
       // temp api data
       axios("https://my.api.mockaroo.com/my_saved_schema.json?key=dc49f260")
        .then(response => {
            setRestaurants(response.data);
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
                    zip_code: "10011"
                },
                {
                    id: 2,
                    restaurant_name: "Dim Sum Palace",
                    address: "59 2nd Ave",
                    neighborhood: "East Village",
                    city: "New York",
                    state: "New York",
                    zip_code: "10003"
                }
            ];
            setRestaurants(backupRestaurants);
        }); 
    }, []);

	//Temporary restaurant pictures and restaurant data for now, taken from mockaroo and picsum

	return(
		<div className="locationShow">
			<div className="locationShowTop">
				<h1 id="locationShowAbout">Discover the best restaurants near you.</h1>
				<div className="abtSearchBar">
					<input type="text" id="locAbtSearchBar" name="locAbtSearch" placeholder="Enter a location"/>
					<input type="text" id="restAbtSearchBar" name="restAbtSearch" placeholder="Search for restaurants"/>
					<Link to="/location/show"><button type="submit" id="locAbtSearchBTN">Search</button></Link>
				</div>
			</div>
			<div className="locRestList">
				{restaurants.map(item => (
					<div className="locRestCard" key={item.id}>
						<a href={`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}, ${item.state} ${item.zip_code}`} target="_blank" className="topRightDir">Directions</a>
						<img src={`https://picsum.photos/200?id=${item.restaurant_name}`} className="locRestCardImg"/>
						<div className="restNameList">{item.restaurant_name}</div>
                        <div className="cuisineName">{item.cuisine} Cuisine</div>
						{item.address}<br />
						{item.city}, {item.state}, {item.zip_code}<br />
                        <Link to = "/meal_history"><a>Add to Meal History</a></Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default LocationShow;