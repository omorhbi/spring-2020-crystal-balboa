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
                    <td>{Date}</td>
                    <td>{Name}</td>
                    <td>{Address}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div id="parent">
            <img src="https://picsum.photos/200" id="profile_picture"></img>
            <h1>Meal History</h1>
            <p>Viewing history from: last month</p>
    
            
    
            <table id="history_table">
                <tbody>
                {this.renderRestaurantTable()}
                </tbody>
            </table>

            </div>
    )
    }
    }
   

export default Meal_History;