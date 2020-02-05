import React, { useContext } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { auth } from '../config/fire';
import { Authentication } from '../context/AuthContext';
import UserProvider from '../context/UserContext';

import { Header } from './Header';
import { Profil } from './Profil';
import { RoomsList } from './RoomsList';
import { CreateRoom } from './CreateRoom';
import { ChatRoom } from './ChatRoom';

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
                    <Route path="/create" component={ CreateRoom } />
                    <Route path="/chat" component={ ChatRoom } />
                </Switch>
            </UserProvider>
        )
    } else {
        return (<Redirect to={{ 
                pathname: "/login", 
                state: { 
                    prevLocation: history.location.pathname
                }
            }
        }/>)
    }
    
}