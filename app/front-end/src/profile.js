import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './profile.css';

const Profile = (props) => {
    
    const history = useHistory();
    const token = localStorage.getItem('jwtToken');
    console.log(token, " token is here");

    if (!token){
        history.push('/login');
    }
    const [name, setName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [preferences, setPreferences] = useState([]);
	const [count, setCount] = useState(0);
	const [priceRange, setPriceRange] = useState("");
    console.log(priceRange[0] + "cheap");

    const [resName, setResName] = useState(["Joe's Shanghai", "Xi'an Famous Foods"]);
    const [resLoc, setResLoc] = useState("New York City");

    const resObject = {
        name: resName,
        loc: resLoc
    };

    useEffect(() =>{
        axios.post('./profile', { resObject })
            .then(res => {
                const user = res.data.currUser;
                //console.log(JSON.stringify(user) + " here");

                setName(user.name);
                setPreferences(user.preferences.type);

                let rangeLength = user.preferences.price.length;
                const priceList = user.preferences.price.map(price => {
                    rangeLength--;
                    let suffix = ', ';
                    if (rangeLength === 0){
                        suffix = '';
                    }
                    return '$'.repeat(price) + suffix;
                    
                });
                setPriceRange(priceList);
                let idx = 0;
                const parsed = res.data.restaurants;
                const resRests = parsed.map(r => {
                    let addLine = r.location.substr(0,r.location.indexOf(','));
                    let stateLine = r.location.substr(r.location.indexOf(',')+1);
                    if(addLine===""){
                        addLine = stateLine;
                        stateLine = ""; 
                    }
                    let price = "";
                    for (let i = 0; i < r.price; i++){
                        price += "$";
                    }
                    return {
                        restaurant_name: r.name,
                        address: addLine,
                        city: stateLine,
                        cuisine: r.cuisine,
                        thumb: r.thumbnail,
                        idx: idx++,
                        price: price
                    }                    
                });
                setRestaurants(resRests);
            })
            .catch(err =>{
                console.log("Error with posting");
                console.log(err);
        });

    }, []); 

    const handleMeal = (event) => {
        const ind = parseInt(event.target.name, 10);
        const restObj = restaurants[ind];
        axios.post('./meal_history', restObj)
            .then(res => {
                history.push('/meal_history');
            })
            .catch(err =>{
                console.log("POST error");
            })
    }

    return (
    	<div className = "profile">
    		<div className = "profileTop">
    			<h1 id = "welcomeMessage">Welcome, {name}!</h1>
    			<h2 className = "recs">Here are today's recommendations based on your preferences:</h2>
    			
    		</div>
    		<div className = "profileRestList">
    			{restaurants.map(item => (
    				<div className = "profileRestCard" key = {item.id}>
    					<a href = {`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}`} target="_blank" className="topRightDir">Directions</a>
    					<img src={`${item.thumb}`} className="profileRestCardImg"/>
    					<div className = "restNameList">{item.restaurant_name} ({item.price})</div>
    					<div className = "cuisineName">{item.cuisine} Cuisine</div>
    					{item.address}<br />
    					{item.city}<br />
    					<a name={`${item.idx}`} onClick={handleMeal} className="addMealProfile">Add to Meal History</a>
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