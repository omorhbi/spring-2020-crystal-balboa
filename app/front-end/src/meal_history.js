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
  
    const [sampleRestaurants, setSampleRestaurants] = useState([]);
    const [value, setValue] = useState("all");

    useEffect (() =>{
        axios.get('./meal_history')
        .then(res =>{
            console.log(res);
            const parsed = res.data;
            console.log(parsed);
            const resRests = parsed.map(r =>{
                let tempDate = r.dateMonth.toString() + "/" + r.dateDay.toString() + "/" + r.dateYear.toString();
                return{
                    id: r.id,
                    name: r.name,
                    address: r.location,
                    date: tempDate
                }
            })
            console.log(resRests);
            setSampleRestaurants(resRests);
            console.log(sampleRestaurants);
        })
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
                console.log(sampleRestaurants);
            })
    };

    const handleTime = (event) => {
        setValue(event.target.value);
    }

    const handleFilter = (event) => {
        
    }

        return(
            <div id="parent">
            <h1 className="meal_h">Meal History</h1>
            <p className="meal_p">Viewing history from: All Time</p>
            
            <div id="meal_table">
                <label for="time_frames" id="time_f"> View entries from: </label>
                <select id="time_frames" name="time_frames" onChange={handleTime}>
                    <option value="all">All Time</option>
                    <option value="year">This Year</option>
                    <option value="month">Last Month</option>
                    <option value="week">Last Week</option>
                    <option value="day">Today</option>
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