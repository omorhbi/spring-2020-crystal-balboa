import React, { Component, useEffect, useState, useReducer } from 'react';
import './meal_history.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


const Meal_History = (props) =>{
    const history = useHistory();
    const token = localStorage.getItem('jwtToken');
    console.log(token, " token is here");

    if (!token){
        history.push('/login');
    }
  
    const [sampleFilter, setFilter] = useState('All Time');
    const [sampleRestaurants, setSampleRestaurants] = useState([]);
    const [sampleRestaurants2, setSampleRestaurants2] = useState([]);

    useEffect (() =>{
        if(token){
            axios.get('./meal_history')
            .then(res =>{
                console.log(res);
                const parsed = res.data;
                console.log(parsed);
                const resRests = parsed.map(r =>{
                    let tempDate = r.date; //r.dateMonth.toString() + "/" + r.dateDay.toString() + "/" + r.dateYear.toString();
                    return{
                        id: r.id,
                        name: r.name,
                        address: r.location,
                        date: tempDate
                    }
                })
                console.log(resRests);
                setSampleRestaurants(resRests);
                setSampleRestaurants2(resRests);
                console.log(sampleRestaurants);
            });
        }
    }, []);

    function handleDelete(item_id) {
        axios.post('./meal_history_delete', {id: item_id})
            .then(res => {
                console.log('deleted');
                for(let i=0; i<sampleRestaurants.length; i++){
                    if(sampleRestaurants[i].id === item_id){
                        sampleRestaurants.splice(i, 1);
                    }
                }
                window.location.reload();
            })
    };

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleFilter = (event) => {
        let d = new Date();
        d = d.toLocaleDateString();
        console.log(d);
        const dateData = d.split('/');
        let results = [];

        switch (sampleFilter) {
            case "All Time" : 
                setSampleRestaurants(sampleRestaurants2);
                break;
            case "This Year" :
                for(let i = 0; i < sampleRestaurants2.length; i++){
                    if(sampleRestaurants2[i].date.split('/')[2] === dateData[2]){
                        results.push(sampleRestaurants2[i]);
                    }
                }
                setSampleRestaurants(results);
                break;
            case "This Month":
                for(let i = 0; i < sampleRestaurants2.length; i++){
                    if(sampleRestaurants2[i].date.split('/')[2] === dateData[2]){
                        if(sampleRestaurants2[i].date.split('/')[0] === dateData[0]){
                            results.push(sampleRestaurants2[i]);
                        }
                    }
                }
                setSampleRestaurants(results);
                break;
            case "Today":
                for(let i = 0; i < sampleRestaurants2.length; i++){
                    if(d === sampleRestaurants2[i].date){
                        results.push(sampleRestaurants2[i]);
                    }
                }
                setSampleRestaurants(results);
                break;
            case "This Week":
                for(let i = 0; i < sampleRestaurants2.length; i++){
                    if(dayDifference(d, sampleRestaurants2[i].date) <= 7){
                        results.push(sampleRestaurants2[i]);
                    }
                }
                setSampleRestaurants(results);
                break;
        }


    }
    function dayDifference(day1, day2){

        const slice1 = day1.split('/');
        const slice2 = day2.split('/');

        const one = new Date(slice1[2], slice1[0], slice1[1]);
        const two = new Date(slice2[2], slice2[0], slice2[1]);

        console.log(slice1);
        console.log(slice2);

        console.log(one);
        console.log(two);

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const millisBetween = one.getTime() - two.getTime();
        const daysBetween = Math.floor(millisBetween / millisecondsPerDay);
    
        console.log(one.getTime(), two.getTime())
        console.log(millisBetween);
        console.log(daysBetween);

        return daysBetween;
    }

        return(
            <div id="parent">
            <h1 className="meal_h">Meal History</h1>
            <p className="meal_p">Viewing history from: {sampleFilter}</p>
            
            <div id="meal_table">
                <label for="time_frames" id="time_f"> View entries from: </label>
                <select id="time_frames" name="time_frames" onChange={handleChange}>
                    <option value="All Time">All Time</option>
                    <option value="This Year">This Year</option>
                    <option value="This Month">This Month</option>
                    <option value="This Week">This Week</option>
                    <option value="Today">Today</option>
                    </select>
                    <input className="option_button" type="submit" onClick={handleFilter}></input>
            </div>
            



			<div className="rest_history">
				{sampleRestaurants.map(item => (
					<div className="rest_card" key={item.id}>
                        <div className="dateTR">{item.date}</div>
						<div className="restNameList">{item.name}</div>
						{item.address}<br />
                        <button  type="submit" className="option_button" id= {item.id} onClick={() => handleDelete(item.id)}>Delete Entry</button>
					</div>
				))}
			</div>
		</div>


    )
    }
   

export default Meal_History;