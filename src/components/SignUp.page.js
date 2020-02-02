import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/SignUp.scss';

import { auth, db } from '../config/fire';
import { Link } from 'react-router-dom';
import { Authentication } from '../context/AuthContext';

export const SignUp = () => {
    const {user} = useContext(Authentication);

    const [pseudo, setPseudo] = useState("");
    const [pseudoError, setPseudoError] = useState(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);

    const [secondPassword, setSecondPassword] = useState("");
    const [secondPasswordError, setSecondPasswordError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        let pseudoCheck = false, 
        emailCheck = false, 
        passwordCheck = false,
        secondPasswordCheck = false;

        // form validation
        if(pseudo.length < 6) {
            setPseudoError("Your pseudo should indludes more than 6 characteres !");
            pseudoCheck = false;
        } else if(!/([A-Z]{0,1})([a-z]{3,})([0-9]{2,4})/.test(pseudo)) {
            setPseudoError("Your pseudo should indludes at less 2 numbers !");
            pseudoCheck = false;
        } else {
            setPseudoError(null);
            pseudoCheck = true;
        }

        if(!/[a-z0-9]{4,}\@[a-z]{3,}\.[a-z]+/.test(email)) {
            setEmailError("Email address invalid !");
            emailCheck = false;
        } else {
            setEmailError(null);
            emailCheck = true;
        }

        if(password.length < 8) {
            setPasswordError("Your password should includes more than 6 charactere !");
            passwordCheck = false;
        } else {
            setPasswordError(null);
            passwordCheck = true;
        }

        if(secondPassword !== password) {
            setSecondPasswordError("Your password doesn't match !");
            secondPasswordCheck = false;
        } else {
            setSecondPasswordError(null);
            secondPasswordCheck = true;
        }

        // create user account
        if(pseudoCheck && emailCheck && passwordCheck && secondPasswordCheck) {
            auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                cred.user.sendEmailVerification();
                db.collection("users").doc(cred.user.uid).set({
                    email,
                    pseudo,
                    password,
                    rooms: []
                });
                setPseudo("");
                setEmail("");
                setPassword("");
                setSecondPassword("");
            })
            .catch(err => {
                if(err.code === "auth/email-already-in-use") {
                    setEmailError(err.message)
                }
            })
        }
    }

    if(user) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <div className="SignUp">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={pseudoError?"form_div error_div":"form_div"}>
                        <label>Pseudo:</label>
                        <input 
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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