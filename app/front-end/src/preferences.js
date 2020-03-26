import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './preferences.css';



const preferences = () => {
    return (
        <div className = "preferencesPage">
            <form action="/profile">
                <h2 className="prefTitle">Preferences</h2>
                <div className="priceRange">
                    <input type="checkbox" id="p1" value={1} className = "prices"/>
                    <label for="p1" id = "oneDollar" className = "priceLabel">$</label>
                    <input type="checkbox" id="p2" value={2} className = "prices"/>
                    <label for="p2" id = "twoDollar" className = "priceLabel">$$</label>
                    <input type="checkbox" id="p3" value={3} className = "prices"/>
                    <label for="p3" id = "threeDollar" className = "priceLabel">$$$</label>
                    <input type="checkbox" id="p4" value={4} className = "prices"/>
                    <label for="p4" id = "fourDollar" className = "priceLabel">$$$$</label>
                </div>
                <h3 className = "prefTitle">Culinary Preferences</h3>
                <div className="culinary">
                    <input type="checkbox" id="c1" value="American"/>
                    <label for="c1">American</label><br/>
                    <input type="checkbox" id="c2" value="Chinese"/>
                    <label for="c2">Chinese</label><br/>
                    <input type="checkbox" id="c3" value="French"/>
                    <label for="c3">French</label><br/>
                    <input type="checkbox" id="c4" value="Greek"/>
                    <label for="c4">Greek</label><br/>
                    <input type="checkbox" id="c5" value="Indian"/>
                    <label for="c5">Indian</label><br/>
                    <input type="checkbox" id="c6" value="Japanese"/>
                    <label for="c6">Japanese</label><br/>
                    <input type="checkbox" id="c7" value="Korean"/>
                    <label for="c7">Korean</label><br/>
                    <input type="checkbox" id="c8" value="Mexican"/>
                    <label for="c8">Mexican</label><br/>
                </div>
                <div>
                  
                </div>
            </form>
            <br/><input type="submit" value="Submit"  className="submitPref"/>
        </div>
    );
};

export default preferences;