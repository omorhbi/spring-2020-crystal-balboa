import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import Background from './images/supperwhere_login.png';
document.body.id = 'login_page';

const Login_and_Signup = () => {
    return(
        <div id="parent">
        <div id= "login_component">
            <h1>Have an account?</h1>
            <p>Log in and get access to the best restaurants for YOUR needs.</p>
            <form>
            <label>Username: </label>
            <input type="text" name="username"></input><br></br><br></br>
            <label>Password:   </label>
            <input type="text" name="password"></input><br></br><br></br>
            </form>
            <a href="/profile" className="anchor"><button id="login-button">Submit (mimics successful login)</button></a><br></br><br></br>
            <a href="/mistake" className="anchor"><button id="error-button">Mimics error in login</button></a>
        </div>
        <div id = "signup_component">
            <h1>New to Supperwhere?</h1>
            <p>Signing up is quick, easy, and free of charge. Sign up now by <a href="/signup">clicking right here.</a></p>
        </div>
        </div>
    );
}

export default Login_and_Signup;