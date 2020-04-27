import React, {useState, useEffect} from 'react';
import './signup.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 
import setAuthorizationToken from './authorization';
document.body.id = "signup";

const Signup = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setName] = useState("");
    const [zipCode, setZip] = useState(10017);

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleZipChange = (event) => {
        setZip(event.target.value);
    }

    const handleSubmit = (event) => {
        const resObject = {username: username, password: password, firstname: firstname, zipCode, zipCode};
        axios.post('./signup', resObject)
            .then(res => {
                if(res.data.mistake){
                    //console.log(res.data.mistake);
                    history.push('/mistake');
                }
                else{
                    const token = res.data.token;
                    console.log(token);
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
        <div id="parent_1">
            <h1 id="coolio">Embark on your food journey.</h1>
                <label>First Name: </label>
                <input type="text" name="firstname" onChange={handleNameChange}></input>
                <p className="signup_para">(This is the name Supperwhere will use to refer to you.)</p>
                <label>Username:  </label>
                <input type="text" name="username" onChange={handleUserChange}></input>
                <p className="signup_para">(This is the name that you will use to log in.)</p>
                <label>Password:   </label>
                <input type="password" name="password" onChange={handlePassChange}></input><br></br>
                <p className="signup_para">(Don't forget this! Supperwhere does not have a password retrieval system in place.)</p>
                <label>Zip Code: </label>
                <input type="text" required maxlength="5" name="zip" onChange={handleZipChange}></input>
                <p className="signup_para">(You can always change this, so don't worry.)</p>
                <br></br>
                <div id="button">
                    <button id="login-button" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            <br></br>
            <br></br>
        </div>
    )
};

export default Signup;