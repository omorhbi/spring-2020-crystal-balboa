import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import './preferences.css';

const Preferences = (props) => {

    const history = useHistory();
    const token = localStorage.getItem('jwtToken');
    console.log(token, " token is here");

    if (!token){
        history.push('/login');
    }

    const [prices, setPrices] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);

    const handlePrices = (event) => {
        const val = parseInt(event, 10);
        if(prices.includes(val)){
            for(let i=0; i<prices.length; i++){
                if(prices[i] === val){
                    prices.splice(i, 1);
                }
            }
        }
        else{
            prices.push(val);
        }
    }

    const handleCuisine = (event) => {
        const val = event;
        if(cuisines.includes(val)){
            for(let i=0; i<cuisines.length; i++){
                if(cuisines[i] === val){
                    cuisines.splice(i, 1);
                }
            }
        }
        else{
            cuisines.push(val);
        }
    }

    const handleSubmit = (event) => {
        const resObject = {
            prices: prices,
            cuisines: cuisines
        };
        //console.log(resObject);
        axios.post('./preferences', { resObject })
            .then(res => {
                console.log("success");
            })
            .catch(err =>{
                console.log("Error with posting");
                console.log(err);
            }); 
    }

    return (
        <div className = "preferencesPage">
            <form action="/profile">
                <h3 className="prefTitle">Preferences</h3>
                <div className="priceRange">
                    <input type="checkbox" id="p1" value="1" className = "prices" onChange={e => handlePrices(e.target.value)}/>
                    <label for="p1" id = "oneDollar" className = "priceLabel">$</label>
                    <input type="checkbox" id="p2" value="2" className = "prices" onChange={e => handlePrices(e.target.value)}/>
                    <label for="p2" id = "twoDollar" className = "priceLabel">$$</label>
                    <input type="checkbox" id="p3" value="3" className = "prices" onChange={e => handlePrices(e.target.value)}/>
                    <label for="p3" id = "threeDollar" className = "priceLabel">$$$</label>
                    <input type="checkbox" id="p4" value="4" className = "prices" onChange={e => handlePrices(e.target.value)}/>
                    <label for="p4" id = "fourDollar" className = "priceLabel">$$$$</label>
                </div>
                <h5 className = "prefTitle">Culinary Preferences</h5>
                <div className="culinary">
                    <input type="checkbox" id="c1" value="American" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c1">American</label><br/>
                    <input type="checkbox" id="c2" value="Chinese" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c2">Chinese</label><br/>
                    <input type="checkbox" id="c3" value="French" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c3">French</label><br/>
                    <input type="checkbox" id="c4" value="Greek" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c4">Greek</label><br/>
                    <input type="checkbox" id="c5" value="Indian" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c5">Indian</label><br/>
                    <input type="checkbox" id="c6" value="Japanese" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c6">Japanese</label><br/>
                    <input type="checkbox" id="c7" value="Korean" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c7">Korean</label><br/>
                    <input type="checkbox" id="c8" value="Mexican" onChange={e => handleCuisine(e.target.value)}/>
                    <label for="c8">Mexican</label><br/>
                </div>
                <div>
                  
                </div>
            </form>
            <br/><input type="submit" value="Submit" className="submitPref" onClick={handleSubmit}/>
        </div>
    );
};

export default Preferences;