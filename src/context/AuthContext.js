import React, { createContext, useState, useEffect } from 'react';

import { auth } from '../config/fire';

export const Authentication = createContext("");

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        });
    }, []);

    return(
        <Authentication.Provider value={{ user }}>
            {children}
        </Authentication.Provider>
    )
}