import React, { useState } from 'react';

import '../styles/SignUp.scss';

import { auth } from '../config/fire';
import { Link } from 'react-router-dom';

export const SignUp = () => {
    const [pseudo, setPseudo] = useState("");
    const [pseudoError, setPseudoError] = useState();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState();

    const [secondPassword, setSecondPassword] = useState("");
    const [secondPasswordError, setSecondPasswordError] = useState();

    const handleSubmit = e => {
        e.preventDefault();
    }

    if(auth.currentUser) {
        return (
            <div>your must not have an acount to create one</div>
        )
    } else {
        return (
            <div className="SignUp">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={pseudoError?"form_div error_div":"form_div"}>
                        <label>Pseudo:</label>
                        <input 
                            required 
                            type="text" 
                            value={pseudo} 
                            onChange={e => setPseudo(e.target.value)} 
                        />
                        {pseudoError?(<span className="error_aide">{pseudoError}</span>):null}
                    </div>

                    <div className={emailError?"form_div error_div":"form_div"}>
                        <label>Address Email:</label>
                        <input 
                            required 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        {emailError?(<span className="error_aide">{emailError}</span>):null}
                        
                    </div>

                    <div className={passwordError?"form_div error_div":"form_div"}>
                        <label>Choose Password:</label>
                        <input 
                            required 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        {passwordError?(<span className="error_aide">{passwordError}</span>):null}
                    </div>

                    <div className={secondPasswordError?"form_div error_div":"form_div"}>
                        <label>Re-write Password:</label>
                        <input 
                            required 
                            type="password" 
                            value={secondPassword} 
                            onChange={e => setSecondPassword(e.target.value)} 
                        />
                        {secondPasswordError?(<span className="error_aide">{secondPasswordError}</span>):null}
                    </div>

                    <button className="submit_btn">create</button>
                </form>

                <div className="info_div">
                    <p>Do you have already an account? <Link to="/login">Login</Link></p>
                </div>

            </div>
        )        
    }
    
}