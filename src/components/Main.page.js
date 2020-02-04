import React, { useContext } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { auth } from '../config/fire';
import { Authentication } from '../context/AuthContext';
import UserProvider from '../context/UserContext';

import { Header } from './Header';
import { Profil } from './Profil';
import { RoomsList } from './RoomsList';

export const Main = ({ history }) => {
    const { user } = useContext(Authentication);

    const signOut = () => {
        auth.signOut()
        .then(() => history.push("/"))
    }

    if(user) {
        return (
            <UserProvider>
                <Header signOut={signOut} />
                <Switch>
                    <Route path="/profil" component={ Profil } />
                    <Route path="/rooms" component={ RoomsList } />
                    <Redirect from="/" to="/rooms" />
                </Switch>
            </UserProvider>
        )
    } else {
        return <Redirect to="/login" />
    }
    
}