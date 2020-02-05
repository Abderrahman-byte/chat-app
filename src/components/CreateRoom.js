import React, { useState, useContext } from 'react';
import uuid from 'uuid/v1';

import '../styles/CreateRoom.scss';

import { db } from '../config/fire';
import { User } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

export const CreateRoom = () => {
    const { userId, changeRoom } = useContext(User)
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomDesc, setNewRoomDesc] = useState('');
    const history = useHistory();

    const createRoom = (e) => {
        e.preventDefault();
        if(newRoomName !== '' && newRoomName !== '') {
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
                        body: `welcom to my chat room "${newRoomName}"`
                    }
                ]
            })
            .then((res) => {
                changeRoom(res.id)
                setNewRoomName('');
                setNewRoomDesc('');
                history.push('/chat');
            })
        }
        
    }

    return (
        <div className="CreateRoom">
            <h2>Create Chat Room</h2>
            <form onSubmit={createRoom} className="create_room_form">
                <div className="form_div">
                    <label>Title</label>
                    <input 
                        value={newRoomName} 
                        type="text" 
                        onChange={e => setNewRoomName(e.target.value)} 
                        required
                    />
                </div>
                <div className="form_div">
                    <label>description</label>
                    <textarea 
                        maxLength="50"
                        value={newRoomDesc}
                        onChange={e => setNewRoomDesc(e.target.value)} 
                        required
                    />
                </div>

                <button className="create_btn">create</button>
            </form>
        </div>
    )
}