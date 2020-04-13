import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = (props) => {
	const [restaurants, setRestaurants] = useState([]);
	const [preferences, setPreferences] = useState(["American",
                                                    "Desserts",
													"Tex-Mex",
													"Chinese",
                                                    "Bagels",
                                                    "New American"]);
	const [count, setCount] = useState(0);
	const [priceRange, setPriceRange] = useState(["$, $$, $$$"])

    const [resName, setResName] = useState(["Joe's Shanghai", "Xi'an Famous Foods"]);
    const [resLoc, setResLoc] = useState("New York City");

    const resObject = {
        name: resName,
        loc: resLoc
    };
	/*const range = `${priceRange[0]} - ${priceRange[priceRange.length]}`;
	console.log("price drange " + priceRange[0]);*/
    useEffect(() =>{
        axios.post('./profile', { resObject })
            .then(res => {
                const parsed = res.data.restaurants;
                const resRests = parsed.map(r => {
                    let addLine = r.location.substr(0,r.location.indexOf(','));
                    let stateLine = r.location.substr(r.location.indexOf(',')+1);
                    if(addLine===""){
                        addLine = stateLine;
                        stateLine = ""; 
                    }
                    return {
                        restaurant_name: r.name,
                        address: addLine,
                        city: stateLine,
                        cuisine: r.cuisine,
                        thumb: r.thumbnail
                    }                    
                });
                setRestaurants(resRests);
            })
            .catch(err =>{
                console.log("Error with posting");
                console.log(err);
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
    					<a href = {`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}`} target="_blank" className="topRightDir">Directions</a>
    					<img src={`${item.thumb}`} className="profileRestCardImg"/>
    					<div className = "restNameList">{item.restaurant_name}</div>
    					<div className = "cuisineName">{item.cuisine} Cuisine</div>
    					{item.address}<br />
    					{item.city}<br />
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
	    		
	    			
	   				<Link to="/preferences"><button type="submit" id="prefSearchBTN">Change Preferences</button></Link>    		
	    			
	    		
	    		</div>
	    	</div>
    	</div>

    )
}

export default Profile;