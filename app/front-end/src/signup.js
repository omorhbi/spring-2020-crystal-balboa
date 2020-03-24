import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
document.body.id = "signup";
const Signup = () => {
    return(
        <div id="parent_1">
            <h1 id="coolio">Embark on your food journey.</h1>
            <form>
            <label>First Name: </label>
            <input type="text" name="firstname"></input>
            <p>(This is the name Supperwhere will use to refer to you.)</p>
            <label>Username:  </label>
            <input type="text" name="username"></input>
            <p>(This is the name that you will use to log in.)</p>
            <label>Password:   </label>
            <input type="text" name="password"></input><br></br>
            <p>(Don't forget this! Supperwhere does not have a password retrieval system in place.)</p>
            <label>Zip Code: </label>
            <input type="text" required maxlength="5" name="zip"></input>
            <p>(You can always change this, so don't worry.)</p>
            </form>
            <br></br>
            <div id="button">
            <a href="/profile" class="anchor"><button id="login-button">Submit (mimics successful signup)</button></a>
            </div>
            <br></br>
            <br></br>



        </div>
    )
};

export default Signup; 