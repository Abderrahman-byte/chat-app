import React, { useState, useContext } from 'react';
import uuid from 'uuid/v1';

import '../styles/CreateRoom.scss';
import { db } from '../config/fire';
import { User } from '../context/UserContext';

export const CreateRoom = () => {
    const { userId } = useContext(User)
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomDesc, setNewRoomDesc] = useState('');

    const createRoom = (e) => {
        e.preventDefault();
        db.collection('rooms').add({
            admin_id: userId,
            creating_date: new Date().getTime(),
            description: newRoomDesc,
            name: newRoomName,
            messages: [
                {
                    id: uuid(),
                    sender_id: userId,
                    sending_date: new Date().getTime(),
                    body: "welcom to my chat room"
                }
            ]
        })
        .then(() => console.log("room created"))
    }

    return (
        <div className="CeateRoom">
            <h2>Create Chat Room</h2>
            <form onSubmit={createRoom}>
                <div>
                    <label>Title</label>
                    <input 
                        value={newRoomName} 
                        type="text" 
                        onChange={e => setNewRoomName(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>description</label>
                    <textarea 
                        value={newRoomDesc}
                        onChange={e => setNewRoomDesc(e.target.value)} 
                        required
                    />
                </div>

                <button>create</button>
            </form>
        </div>
    )
}