import React, { Component } from 'react';
import './meal_history.css';
import { Link } from 'react-router-dom';

class Meal_History extends Component{
    constructor(props){
        super(props)
        this.state = {
            restautants:[
                {Date: '3/11/2020', Name: "Farooks Halal Cart", Address: "140 East 14th Street"},
                {Date: '2/16/2019', Name: "Homemade Dumpling", Address: "27 Essex St A"}
            ]
        }
    };

    renderRestaurantTable(){
        return this.state.restautants.map((restaurant, index)=>{
            const{Date, Name, Address} = restaurant
            return(
                
                <tr key={Date}>
                    <td scope="row">{Date}</td>
                    <td>{Name}</td>
                    <td>{Address}</td>
                    <td><a href="meal_history/delete"><button className="option_button">Delete        </button></a></td>
                </tr>
            )
        })
    }

    render(){
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
            



            <table id="history_table">
                <thead>
                <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Delete Entry</th>
                    </tr>
                </thead>
                <tbody>

                {this.renderRestaurantTable()}
                </tbody>
            </table>

            </div>
    )
    }
    }
   

export default Meal_History;