import "./Register.css";
import React from "react";
import { useState } from "react";

function Register() {


    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const clicked = () => {
        // if(inputs.psswd!=inputs.Cpsswd)
        // alert("Account has been created!")
        console.log(inputs);
    }
    return (
        <React.Fragment>
            <section>
                <div className="login_view7">


                    <div className="header7">
                        <img src="https://upload.wikimedia.org/wikipedia/en/4/4c/Official_Logo_of_IIT%28BHU%29%2CVaranasi%2CIndia%2C2013.png"
                            height={'50px'} alt='IITBHU_logo'></img>
                        <h1>GEO-Map</h1>
                        <h1>CE-291</h1>
                    </div>

                    <div className="content17">

                        <h1>Registration</h1>


                            <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder="Name" required/><br />
                            <input type="text" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="E-Mail" required/><br />

                            <input type="text" name="psswd" value={inputs.psswd || ""} onChange={handleChange} placeholder="Password" required/><br />
                            <input type="text" name="Cpsswd" value={inputs.Cpsswd || ""} onChange={handleChange} placeholder="Confirm-Password" required/><br />

                            <p2 id="output"></p2>
                            <button type="button" onClick={clicked()}>SUBMIT</button>

                    </div>

                    <div className="footer7">


                    </div>

                </div>
            </section>

        </React.Fragment>
    )
}

export default Register;