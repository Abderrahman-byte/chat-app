import React, { useState } from 'react';

import '../styles/Login.scss';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
     
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div className="Login">
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
        </div>
    )
}