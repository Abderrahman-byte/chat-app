import React from 'react';
import { auth } from '../config/fire';
import { Redirect } from 'react-router-dom';

export const Main = () => {

    if(auth.currentUser) {
        return (
            <div className="Main">
                Main Page
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
    
}