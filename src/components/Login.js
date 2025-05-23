import React, { useState } from "react";
import "./Login.css";
import JsonData from "./credentials.json";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaMapMarkedAlt } from 'react-icons/fa';

function Login() {
    const [verify, setVerify] = useState(false);
    const [output, setOutput] = useState('');
    const [uname, setname] = useState('');
    const [pssd, setPssd] = useState('');

    const setUname = (event) => {
        setname(event.target.value);
        setOutput("");
    }

    const setPass = (event) => {
        setPssd(event.target.value);
        setOutput("");
    }

    const data = JsonData.filter(info => info);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        for (var i = 0; i < data.length; i++) {
            if (data[i].id === uname && data[i].pssd === pssd) {
                setVerify(true);
                break;
            }
        }

        if (verify)
            navigate('/Map');
        else
            setOutput("Incorrect Credentials!");
    };

    const register1 = (event) => {
        event.preventDefault();
        navigate('/register');
    }

    return (
        <div className="login_view">
            <div className="header">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/en/4/4c/Official_Logo_of_IIT%28BHU%29%2CVaranasi%2CIndia%2C2013.png"
                    height={'50px'} 
                    alt='IITBHU_logo'
                />
                <h1>GEO-Map</h1>
                <img 
                    src="https://www.iitbhu.ac.in/contents/iitbhu/img/other/emblem.jpg"
                    height={'50px'} 
                    alt='IITBHU_logo'
                />
            </div>

            <div className="content1">
                <div className="login-header">
                    <h1>Login</h1>
                    <button 
                        className="skip-button"
                        onClick={() => {navigate('/Map')}}
                    >
                        <FaMapMarkedAlt /> Skip Login
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={uname} 
                            onChange={setUname} 
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={pssd} 
                            onChange={setPass} 
                            required
                        />
                    </div>
                    
                    {output && <p className="error-message">{output}</p>}
                    
                    <button type="submit" className="submit-button">
                        <FaSignInAlt /> Login
                    </button>
                </form>
            </div>

            <div className="footer">
                <p>
                    Don't have an account? 
                    <button className="register-button" onClick={register1}>
                        <FaUserPlus /> Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;