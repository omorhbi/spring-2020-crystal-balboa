import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './searchShow.css';
import { Link } from 'react-router-dom';
//import SearchPreferences from './searchPreferences.js';
// import Preferences from './preferences'; // what props will be based off

const SearchShow = (props) => { // props will come from the state variables in preferences.js
	const [restaurants, setRestaurants] = useState([]);
    // hard coded preferences but will act differently once preferences are saved
    // to a database
    const [preferences, setPreferences] = useState(["American",
                                                    "Desserts",
                                                    "Chinese",
                                                    "Italian",
                                                    "Bagels",
                                                    "New American"]);
    const [priceRange, setPriceRange] = useState([1,2,3,4]);

    const [nameSearch, setNameSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");

    const handleNameChange = event => {
        setNameSearch(event.target.value);
        //console.log(nameSearch);
    }

    const handleLocationChange = event => {
        setLocationSearch(event.target.value);
    }

    let slicedData;
    let splitCuisines;
    const handleSubmit = event => {
        event.preventDefault();
        const resObject = {
            resName: nameSearch,
            resLoc: locationSearch
        };
        axios.post('./show', { resObject })
            .then(res => {
                const maxPriceRange = Math.max(...priceRange);
                const parsedData = res.data.restaurants;
                for (let i = 0; i < parsedData.length; i++){
                    splitCuisines = parsedData[i].cuisine.split(', ');
                    console.log(splitCuisines);
                }
                const filteredRes = parsedData.filter(restaurant =>
                    preferences.some(r => restaurant.cuisine.split(', ').includes(r)) && restaurant.price <= maxPriceRange
                );
                if (filteredRes.length <= 10){
                    slicedData = filteredRes;
                }
                else if (filteredRes.length > 10){
                    slicedData = filteredRes.slice(0,10);
                }

                const restaurants = slicedData.map(res => {
                    let address = res.location.substr(0, res.location.indexOf(','));
                    let state = res.location.substr(res.location.indexOf(',') + 1);
                    if (address === ""){
                        address = state;
                        state = "";
                    }
                    return {
                        restaurant_name: res.name,
                        address: address,
                        city: state,
                        cuisine: res.cuisine,
                        thumbnail: res.thumbnail
                    }
                });
                setRestaurants(restaurants);
            })
            .catch(err =>{
                console.log("Error with posting");
                console.log(err);
            });

    }
 

	//Temporary restaurant pictures and restaurant data for now, taken from mockaroo and picsum
	return(
		<div className="searchShow">
			<div className="searchShowTop">
				<h1 id="searchShowAbout">Search for restaurants based on your preferences.</h1>
				<div className="abtSearchBar">
                    <form>
    					<input type="text" id="prefAbtSearchBar" name="prefAbtSearch" value = {locationSearch} onChange= {handleLocationChange} placeholder="Enter a location"/>
    					<input type="text" id="restAbtSearchBar" name="restAbtSearch" value = {nameSearch} onChange = {handleNameChange} placeholder="Search for restaurants"/>
    					<Link to="/searchPreferences/show"><button type="submit" onClick = {handleSubmit} id="prefAbtSearchBTN">Search</button></Link>
                    </form>
				</div>
			</div>
			<div className="prefRestList">
				{restaurants.map(item => (
					<div className="prefRestCard" key={item.id}>
						<a href={`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}`} target="_blank" className="topRightDir">Directions</a>
						<img src={`${item.thumbnail}`} className="prefRestCardImg"/>
						<div className="restNameList">{item.restaurant_name}</div>
                        <div className = "cuisineName">{item.cuisine} Cuisine</div>
						{item.address}<br />
						{item.city}<br />
                        <Link to = "/meal_history"><a>Add to Meal History</a></Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default SearchShow;