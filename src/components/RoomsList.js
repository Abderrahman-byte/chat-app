import React, { useContext } from 'react';

import '../styles/RoomsList.scss';

import { User } from '../context/UserContext';
import { RoomItem } from './RoomItem';

export const RoomsList = () => {
    const { rooms } = useContext(User);
    const roomsListComponent = rooms.map(room => <RoomItem key={room.id} room={room} />)
    return (
        <div className="RoomsList">
            <h3>List of chat rooms</h3>
            {roomsListComponent}
        </div>
    )
}