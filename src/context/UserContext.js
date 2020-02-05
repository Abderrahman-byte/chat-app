import React, { createContext, useState, useEffect, useContext, memo } from 'react';

import { db } from '../config/fire';
import { Authentication } from './AuthContext';

export const User = createContext();

const UserProvider = ({ children }) => {
    const {user} = useContext(Authentication);

    const [userProfil, setUserProfil] = useState({});
    const [rooms, setRooms] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    
    useEffect(() => {
        setUserId(user.uid);
        if(userId) {
            db.doc(`users/${userId}`).onSnapshot(snap => {
                setUserProfil(snap.data())
            })

            db.collection('rooms').onSnapshot(snap => {
                setRooms(snap.docs)
            })
        }

    }, [user, userId]);

    const changeRoom = (id) => {
        setCurrentRoomId(id);
    }

    return (
        <User.Provider value={{ userProfil, userId, rooms, currentRoomId, changeRoom }}>
            { children }
        </User.Provider>
    )
}

export default memo(UserProvider);