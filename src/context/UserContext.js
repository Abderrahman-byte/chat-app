import React, { createContext, useState, useEffect, useContext } from 'react';

import { db } from '../config/fire';
import { Authentication } from './AuthContext';

export const User = createContext();

export const UserProvider = ({ children }) => {
    const {user} = useContext(Authentication);

    const [userProfil, setUserProfil] = useState({});
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        setUserId(user.uid);
        if(userId) {
            db.doc(`users/${userId}`).onSnapshot(snap => {
                setUserProfil(snap.data())
            })
        }

    }, [user, userId])
    return (
        <User.Provider value={{ userProfil }}>
            { children }
        </User.Provider>
    )
}