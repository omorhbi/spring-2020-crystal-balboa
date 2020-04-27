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
  
    const [sampleRestaurants, setSampleRestaurants] = useState([{}]);
    useEffect (() =>{
        axios.get('./meal_history')
        .then(res =>{
            console.log(res);
            const parsed = res.data;
            console.log(parsed);
            const resRests = parsed.map(r =>{
                let tempDate = r.dateMonth.toString() + "/" + r.dateDay.toString() + "/" + r.dateYear.toString();
                return{
                    id: 0,
                    name: r.name,
                    address: r.location,
                    date: tempDate
                }
            })
            console.log(resRests);
          //  const sampleRestaurants = [];
         //   sampleRestaurants.push(resRests);
            setSampleRestaurants(resRests);
            console.log(sampleRestaurants);
        })
        //return sampleRestaurants;
    }, []);
    /** 
    componentDidMount() {
        
    }
    axios.get('./meal_history')
    .then(res =>{
        const parsed = res.data.restaurants;
        const resRests = parsed.map(r =>{
            return 
        })
    })
    */
 /** 
    const sampleRestaurants = [
        {   id: 1,
            date: '3/20/20',
            name: 'Farooks Halal Cart',
            address: '140 East 14th Street'
        },
        {   id: 2,
            date: '2/16/19',
            name: 'Homemade Dumpling',
            address: '27 Essex St A'
        }
    ];
*/
        return(
            <div id="parent">
            <h1 className="meal_h">Meal History</h1>
            <p className="meal_p">Viewing history from: last month</p>
            
            <form id="meal_table">
                <label for="time_frames" id="time_f"> View entries from: </label>
                <select id="time_frames" name="time_frames">
                    <option value="all">All Time</option>
                    <option value="year">This Year</option>
                    <option value="month">Last Month</option>
                    <option value="week">Last Week</option>
                    <option value="day">Today</option>
                    </select>
                    <input className="option_button" type="submit"></input>
            </form>
            



			<div className="rest_history">
				{sampleRestaurants.map(item => (
					<div className="rest_card" key={item.id}>
                        <div className="dateTR">{item.date}</div>
						<div className="restNameList">{item.name}</div>
						{item.address}<br />
                        <form action="/meal_history" method="post">
                        <button name={item.id} type="submit" value={item.id} className="option_button">Delete Entry</button>
                        </form>
					</div>
				))}
			</div>
		</div>


    )
    }
   

export default Meal_History;