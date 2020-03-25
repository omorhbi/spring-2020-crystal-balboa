import React from 'react';
import './mistake.css'
import { Link } from 'react-router-dom';

const Mistake = () =>{
    return(
        <div id="mistake_parent">
            <h1 id="mistake_h">Oops!</h1>
            <br></br>
            <p id="mistake_p">Your credentials were incorrect. Please click <a href="/login">here</a> to re-attempt logging in.</p>
        </div>
    )
};

export default Mistake;