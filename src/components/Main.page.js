import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../config/fire';
import { Authentication } from '../context/AuthContext';

export const Main = ({ history }) => {
    const { user } = useContext(Authentication);
    const signOut = () => {
        auth.signOut()
        .then(() => history.push("/"))
    }

    if(user) {
        return (
            <div className="Main">
                Main Page <button onClick={signOut}>logout</button>
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
    
}