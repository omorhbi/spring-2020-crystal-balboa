import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './LocationShow.css';
import { Link, useHistory } from 'react-router-dom';

const LocationShow = (props) => {
    const history = useHistory();
    const token = localStorage.getItem('jwtToken');
    console.log(token, " token is here");

    if (!token){
        history.push('/login');
    }
	const [restaurants, setRestaurants] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [checkPrefs, setPrefs] = useState(false);

    const handleNameChange = event => {
        setNameSearch(event.target.value);
    }

    const handleLocationChange = event => {
        setLocationSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        if(checkPrefs === false){
            event.preventDefault();
            const resObject = {
                resName: nameSearch,
                resLoc: locationSearch
            };
            axios.post('./show', { resObject })
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
        }
        else{
            event.preventDefault();
            const resObject = {
                resName: nameSearch,
                resLoc: locationSearch
            };
            axios.post('./prefshow', { resObject })
                .then(res => {
                    //console.log(res.data);
                    const parsed = res.data.restaurants;
                    //console.log(parsed);
                    const resRests = parsed.map(r => {
                        return {
                            restaurant_name: r.restaurant_name,
                            address: r.address,
                            city: r.city,
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
        }
    }

    const changeSearch = (event) => {
        setPrefs(!checkPrefs);
    }

	return(
		<div className="locationShow">
			<div className="locationShowTop">
				<h1 id="locationShowAbout">Discover the best restaurants near you.</h1>
				<div className="abtSearchBar">
					<input type="text" id="locAbtSearchBar" name="locAbtSearch" onChange={handleLocationChange} placeholder="Enter a location"/>
					<input type="text" id="restAbtSearchBar" name="restAbtSearch" onChange={handleNameChange} placeholder="Search for restaurants"/>
                    <select id="prefsCheck" onChange={changeSearch}>
                        <option>No Preferences</option>
                        <option>With Preferences</option>
                    </select>
					<Link to="/location/show"><button type="submit" id="locAbtSearchBTN" onClick={handleSubmit}>Search</button></Link>
                </div>
			</div>
			<div className="locRestList">
				{restaurants.map(item => (
					<div className="locRestCard" key={item.id}>
						<a href={`https://www.google.com/maps/dir/?api=1&destination=${item.address}, ${item.city}`} target="_blank" className="topRightDir">Directions</a>
						<img src={`${item.thumb}`} className="locRestCardImg"/>
						<div className="restNameList">{item.restaurant_name}</div>
                        <div className="cuisineName">{item.cuisine} Cuisine</div>
						{item.address}<br />
						{item.city}<br />
                        <Link to = "/meal_history"><a>Add to Meal History</a></Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default LocationShow;