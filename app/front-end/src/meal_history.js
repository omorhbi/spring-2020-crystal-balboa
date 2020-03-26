import React, { Component, useEffect } from 'react';
import './meal_history.css';
import { Link } from 'react-router-dom';

const Meal_History = (props) =>{
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
                        <Link to = "/meal_history/delete"><a>Delete Entry</a></Link>
					</div>
				))}
			</div>
		</div>


    )
    }
   

export default Meal_History;