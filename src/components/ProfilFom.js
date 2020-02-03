import React, { useContext, useState, useEffect } from 'react';

import '../styles/ProfilForm.scss';

import { User } from '../context/UserContext';
import { db, auth } from '../config/fire';
import { Authentication } from '../context/AuthContext';

export const ProfilForm = () => {
    const {userProfil, userId} = useContext(User);
    const {user} = useContext(Authentication);
    
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [succesText, setSuccessText] = useState(null);

    useEffect(() => {
        setPseudo(userProfil.pseudo);
        setPassword(userProfil.password);
    }, [userProfil])

    const changeProfil = e => {
        e.preventDefault();

        if(pseudo.length < 6) {
            setError("Your pseudo should indludes more than 6 characteres !")
        } else if(!/([A-Z]{0,1})([a-z]{3,})([0-9]{2,4})/.test(pseudo)) {
            setError("Your pseudo should indludes at less 2 numbers !")
        } else if(password.length < 8) {
            setError("Your password should includes more than 8 charactere !");
        } else {
            setError(null)
            auth.signInWithEmailAndPassword(userProfil.email, userProfil.password)
            .then(cred => {
                return cred.user.updatePassword(password)
            })
            .then(() => {
                return db.doc(`users/${userId}`)
                .update({ pseudo, password })
            })
            .then(() => setSuccessText("upadate succces"))
            .then(() => {
                setTimeout(() => setSuccessText(null), 3000);
            })
            .catch(err => console.error(err))
            
        }
        
    }

    return (
        <form onSubmit={changeProfil} className="Profil_form">
            <div className="form_div">
                <label>Pseudo:</label>
                <input 
                    autoComplete="off"
                    value={pseudo || ""} 
                    type="text" 
                    onChange={e => setPseudo(e.target.value)}
                />
            </div>
            <div className="form_div">
                <label>Email Address:</label>
                <p>test@gmail.com</p>
            </div>

            <div className="form_div">
                <label>change Password:</label>
                <input 
                    autoComplete="off"
                    onChange={e => setPassword(e.target.value)}
                    value={password || ""} 
                    type="password" 
                />
            </div>
            <button>Save Changes</button>

            {error?(
                <div className="error_div">
                    <p>{error}</p>
                </div>
            ):null}
            {succesText?(
                <div className="success_div">
                    <p>{succesText}</p>
                </div>
            ):null}
        </form>
    )
}