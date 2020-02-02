import React, { createContext, useState, useEffect } from 'react';

import { auth, db } from '../config/fire';

export const Authentication = createContext("");

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setAuthLoading(false);
            setUser(user);
        });
    }, [])

    return(
        <Authentication.Provider value={{ user ,authLoading }}>
            {children}
        </Authentication.Provider>
    )
}