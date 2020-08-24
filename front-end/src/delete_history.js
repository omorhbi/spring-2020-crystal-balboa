import React, { Component } from 'react';
import './delete_history.css';
import { Link } from 'react-router-dom';

const Delete_History = (props) =>{

    const sampleRestaurants = [
        {   id: 1,
            date: '3/20/20',
            name: 'Farooks Halal Cart',
            address: '140 East 14th Street'
        }];
    /** 
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
    */
        return(
            <div id="deleties">
            <h1 id="delete_h1">Are you SURE you want to delete this entry?</h1>
            <div className="rest_history">
            {sampleRestaurants.map(item => (
                <div className="rest_card" key={item.id}>
                    <div className="dateTR">{item.date}</div>
                    <div className="restNameList">{item.name} <br></br> </div>
                    {item.address}<br />
                </div>
            ))}
        </div>
            <br></br>
            <a href="/meal_history"><button className="submit_button">Yes</button></a>
            <a href="/meal_history"><button className="submit_button">Go Back</button></a>
            </div>
        )
    }

export default Delete_History;