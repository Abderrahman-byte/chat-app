import React, { useContext } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { auth } from '../config/fire';
import { Authentication } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';

import { Header } from './Header';
import { Profil } from './Profil';

export const Main = ({ history }) => {
    const { user } = useContext(Authentication);

    // const signOut = () => {
    //     auth.signOut()
    //     .then(() => history.push("/"))
    // }

    if(user) {
        return (
            <UserProvider>
                <Header/>
                <Switch>
                    <Route path="/profil" component={ Profil } />
                    <Redirect from="/" to="/profil" />
                </Switch>
            </UserProvider>
        )
    } else {
        return <Redirect to="/login" />
    }
    
}