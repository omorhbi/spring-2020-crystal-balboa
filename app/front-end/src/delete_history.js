import React, { Component } from 'react';
import './delete_history.css';
import { Link } from 'react-router-dom';

class Delete_History extends Component{
    constructor(props){
        super(props)
        this.state = {
            restautants:[
                {Date: '3/11/2020', Name: "Farooks Halal Cart", Address: "140 East 14th Street"},
            ]
        }
    };

    renderRestaurantEntry(){
        return this.state.restautants.map((restaurant, index)=>{
            const{Date, Name, Address} = restaurant
            return(
                
                <tr key={Date}>
                    <td scope="row">{Date}</td>
                    <td>{Name}</td>
                    <td>{Address}</td>
                </tr>
            )
        })
    }
    render(){
        return(
            <div id="deleties">
            <h1 id="delete_h1">Are you SURE you want to delete this entry?</h1>
            <table>
                <tbody>
                    {this.renderRestaurantEntry()}
                </tbody>
            </table>
            <br></br>
            <a href="/meal_history"><button className="submit_button">Yes</button></a>
            <a href="/meal_history"><button className="submit_button">Go Back</button></a>
            </div>
        )
    }
}

export default Delete_History;