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
    const [birthsDay, setBirthsDay] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState(null);
    const [succesText, setSuccessText] = useState(null);

    useEffect(() => {
        // get today date 
        const year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        month = month < 10?"0" + month:month;
        let day =  new Date().getDate();
        day = day < 10?"0" + day:day;
        const yyyyMMdd = `${year}-${month}-${day}`;

        // set previous user info
        const birthYear = new Date(userProfil.birth_day).getFullYear();
        let birthMonth = new Date(userProfil.birth_day).getMonth() + 1;
        birthMonth = birthMonth < 10?"0" + birthMonth:birthMonth;
        let bithDate =  new Date(userProfil.birth_day).getDate();
        bithDate = bithDate < 10?"0" + bithDate:bithDate;
        const birth = `${birthYear}-${birthMonth}-${bithDate}`;

        // set user Profil info 
        setPseudo(userProfil.pseudo);
        setPassword(userProfil.password);
        setBirthsDay(userProfil.birth_day?birth:yyyyMMdd);
        setGender(userProfil.gender || "nan");

    }, [userProfil])

    const changeProfil = e => {
        e.preventDefault();
        const birth_day = new Date(birthsDay).getTime();
        const today = new Date().getTime();

        if(pseudo.length < 6) {
            setError("Your pseudo should indludes more than 6 characteres !")
        } else if(!/([A-Z]{0,1})([a-z]{3,})([0-9]{2,4})/.test(pseudo)) {
            setError("Your pseudo should indludes at less 2 numbers !")
        } else if(password.length < 8) {
            setError("Your password should includes more than 8 charactere !");
        } else if(today - birth_day < (13 * 366 * 24 * 60 * 60 * 1000) ) {
            setError("Birth day invalidated !")
        } else if(gender === "nan") {
            setError("You have to define your gender to update your profil!")
        } else {
            setError(null)
            auth.signInWithEmailAndPassword(userProfil.email, userProfil.password)
            .then(cred => {
                return cred.user.updatePassword(password)
            })
            .then(() => {
                return db.doc(`users/${userId}`)
                .update({ pseudo, password, birth_day, gender })
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
            {succesText?(
                <div className="success_div">
                    <p>{succesText}</p>
                </div>
            ):null}
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
                <p>{userProfil?userProfil.email:""}</p>
            </div>

            <div className="form_div">
                <label>Birth's day:</label>
                <input 
                    value={birthsDay}
                    autoComplete="off"
                    type="date" 
                    onChange={e => setBirthsDay(`${e.target.value}`)}
                />
            </div>

            <div className="form_div">
                <label>Gender:</label>
                <select value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="nan">Undefined</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
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
            <button className="submit_btn">Save Changes</button>

            {error?(
                <div className="error_div">
                    <p>{error}</p>
                </div>
            ):null}
        </form>
    )
}