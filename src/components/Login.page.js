import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Login.scss';

import { auth } from '../config/fire';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
     
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    if(auth.currentUser) {
        return (<div>You already sign in</div>)
    } else {
        return(
            <div className="Login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={emailError?"form_div error_div":"form_div"} >
                        <label>Email Address:</label>
                        <input 
                            required
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className={passwordError?"form_div error_div":"form_div"}>
                        <label>Password:</label>
                        <input
                            autoComplete="off"
                            required 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMsg !== ""? (
                        <div className="aide_form_div">
                            <span>{errorMsg}</span>
                        </div>
                    ):null}

                    <button className="submit_btn">Login In</button>
                </form>

                <div className="info_div">
                    <p>You dont have account? <Link to="/signup">create account</Link></p>
                </div>
            </div>
        )
    }
}