import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = (props) => {
	const [restaurants, setRestaurants] = useState([]);
	const [preferences, setPreferences] = useState(["Middle Eastern",
													"Tex-Mex",
													"Asian"]);
	const [count, setCount] = useState(0);
	const [priceRange, setPriceRange] = useState(["$, $$, $$$"])

	const range = `${priceRange[0]} - ${priceRange[priceRange.length]}`;
	console.log("price drange " + priceRange[0]);
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

    return (
    	<div className = "profile">
    		<div className = "profileTop">
    			<h1 id = "welcomeMessage">Welcome, Leon!</h1>
    			<h2 className = "recs">Here are today's recommendations based on your preferences:</h2>
    			
    		</div>
    		<div className = "profileRestList">
    			{restaurants.map(item => (
    				<div className = "profileRestCard" key = {item.id}>
    					<a href = {`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}, ${item.state} ${item.zip_code}`} target="_blank" className="topRightDir">Directions</a>
    					<img src={`https://picsum.photos/200?id=${item.restaurant_name}`} className="profileRestCardImg"/>
    					<div className = "restNameList">{item.restaurant_name}</div>
    					<div className = "cuisineName">{item.cuisine} Cuisine</div>
    					{item.address}<br />
    					{item.city}, {item.state}, {item.zip_code}<br />
    					<Link to = "/meal_history"><a>Add to Meal History</a></Link>
    				</div>
    			))}
    		</div>
    		<div id = "savedPreferences">
    			<h2 id = "savedPreferences">Your Saved Preferences</h2>
    		</div>
    		<div className = "prefListOut">
	    		<div className = "preferencesList">
	    			<div className = "prefCol">
	    				<p id = "price">Your price range: </p>
	    				<p id = "priceText">{priceRange}</p>
	    			</div>
	    			
	    			<div className = "prefCol">
	    				<p id = "prefText">Your culinary preferences: </p>
	    				{preferences.map(cuisine => (
	    					<p className = "cuisineItem">{cuisine}</p>
	    				))}
	    			</div>
	    		
	    			
	   				<Link to="/location/show"><button type="submit" id="prefSearchBTN">Change Preferences</button></Link>    		
	    			
	    		
	    		</div>
	    	</div>
    	</div>

    )
}

export default Profile;