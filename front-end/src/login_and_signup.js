import React, {useState, useEffect} from 'react';
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 
import Background from './images/supperwhere_login.png';
import setAuthorizationToken from './authorization';
document.body.id = 'login_page';

const Login_and_Signup = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        const resObject = {username: username, password: password};
        axios.post('./login', resObject)
            .then(res => {
                if(res.data.mistake){
                    //console.log(res.data.mistake);
                    history.push('/mistake');
                }
                else{
                    const token = res.data.token;
                    //console.log(token);
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token);
                    history.push('/profile');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return(
        <div id="parent_2">
        <div id= "login_component">
            <h1 className="header_login">Have an account?</h1>
            <p className="p_login">Log in and get access to the best restaurants for YOUR needs.</p>
            <div id="this_form">
                <label>Username: </label>
                <input type="text" name = "username" onChange={handleUserChange}></input><br></br><br></br>
                <label>Password:   </label>
                <input type="password" name = "password" onChange={handlePassChange}></input><br></br><br></br>
                <div id="buttons">
                <button id="login-button" type="submit" onClick={handleSubmit}>Submit</button><br></br><br></br>
                </div>
            </div>
        </div>
        <div id = "signup_component">
            <h1 className="header_login">New to Supperwhere?</h1>
            <p className="p_login">Signing up is quick, easy, and free of charge. Sign up now by <a href="/signup">clicking right here.</a></p>
        </div>
        </div>
    );
}

export default Login_and_Signup;
