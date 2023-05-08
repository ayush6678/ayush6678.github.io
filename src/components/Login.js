import React, { useState } from "react";
import "./Login.css";
import JsonData from "./credentials.json";
import { useNavigate } from "react-router-dom";

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



    const data = JsonData.filter(info => info)

    console.log(data);
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
            setOutput("Incorrect Credentials!")

    };
    // const clicked = (event) => {
    //     event.preventDefault();
    //     navigate('/test')
    // }
    const register1 = (event) => {
        event.preventDefault();
        navigate('/register')
    }

    return (
        <React.Fragment>
            <section>
                <div className="login_view">


                    <div className="header">

                        <img src="https://upload.wikimedia.org/wikipedia/en/4/4c/Official_Logo_of_IIT%28BHU%29%2CVaranasi%2CIndia%2C2013.png"
                            height={'50px'} alt='IITBHU_logo'></img>
                        <h1>GEO-Map</h1>
                        <img src="https://www.iitbhu.ac.in/contents/iitbhu/img/other/emblem.jpg"
                            height={'50px'} alt='IITBHU_logo'></img>
                    </div>

                    <div className="content1">

                        <h1>Login</h1>

                        <form onSubmit={handleSubmit}>

                            <input type="text" placeholder="User-name" value={uname} onChange={setUname} required></input><br />
                            <input type="text" placeholder="Password" value={pssd} onChange={setPass} required></input><br />
                            <p>{output}</p>
                            <button type="submit">SUBMIT</button>


                        </form>
                    </div>

                    <div className="footer">
                        <p>Don't have an account? Click <button className="button-4" onClick={register1}> here </button> to Register!</p>
                        {/* <button type="button" onClick={clicked}>GO to test</button> */}
                    </div>

                </div>
            </section>

        </React.Fragment>
    );
}

export default Login;