import React from 'react';
import './mistake.css'
import { Link } from 'react-router-dom';

const Mistake = () =>{
    return(
        <div id="mistake_parent">
            <h1 id="mistake_h">Oops!</h1>
            <br></br>
            <p id="mistake_p">Your credentials were incorrect or you tried to sign up with invalid credentials. Please click <a href="/login">here</a> to re-attempt logging in.
            If you are signing in, make sure your username is at least 6 characters long and your password is at least 6 characters long. If it is still giving an error, try another username.</p>
        </div>
    )
};

export default Mistake;