import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import Background from './images/supperwhere_login.png';
document.body.id = 'login_page';

const Login_and_Signup = () => {
    return(
        <div id="parent_2">
        <div id= "login_component">
            <h1 className="header_login">Have an account?</h1>
            <p className="p_login">Log in and get access to the best restaurants for YOUR needs.</p>
            <form id="this_form" method="post" action="/login_and_signup">
            <label>Username: </label>
            <input type="text" name = "username"></input><br></br><br></br>
            <label>Password:   </label>
            <input type="text" name = "password" ></input><br></br><br></br>
            <div id="buttons">
            <button id="login-button" type="submit" formMethod="post">Submit</button><br></br><br></br>
            </div>
            </form>
        </div>
        <div id = "signup_component">
            <h1 className="header_login">New to Supperwhere?</h1>
            <p className="p_login">Signing up is quick, easy, and free of charge. Sign up now by <a href="/signup">clicking right here.</a></p>
        </div>
        </div>
    );
}

export default Login_and_Signup;
