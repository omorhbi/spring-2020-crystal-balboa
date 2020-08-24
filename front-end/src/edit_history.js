import React, { Component } from 'react';
import './edit_history.css';
import { Link} from 'react-router-dom';

const Edit_History = (props) =>{    

    return(
            <div id="edit_page">
            <h1>Edit an entry</h1>
            <form>
                <label>Date: </label>
                <input type="text" className="input_edit" value="3/11/2020"></input>
                <br></br>
                <label>Name: </label>
                <input type="text" className="input_edit" value="Farooks Halal Cart"></input>
                <br></br>
                <label>Address: </label>
                <input type="text" className="input_edit" value="140 East 14th Street"></input>
            </form>
            <br></br>
            <a href="/meal_history"><button className="submit_button">Submit</button></a>
            <a href="/meal_history"><button className="submit_button">Go Back</button></a>
            </div>
    )
    
}

export default Edit_History;