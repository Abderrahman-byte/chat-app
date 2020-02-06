import React, { useContext, useState, useEffect } from 'react';
import { User } from '../context/UserContext';

import '../styles/ChatRoom.scss';
import uuid from 'uuid/v1';
import { db } from '../config/fire';
import { Message } from './Message';
import { Redirect, Link } from 'react-router-dom';

export const ChatRoom = () => {
    const { currentRoomId, userId, rooms } = useContext(User);
    const [currentRoom, setCurrentRoom] = useState({}) ;

    useEffect(() => {
        setCurrentRoom(rooms.find(room => room.id === currentRoomId));
        setTimeout(() => window.scrollTo(0, 5000))
    }, [currentRoomId, rooms]);

    const [msg, setMsg] = useState('');
    
    const sendMsg = (e) => {
        e.preventDefault();

        if(msg !== '' && currentRoom) {
            const length = currentRoom.data().messages.length;
            let messagesArray = currentRoom.data().messages;
            messagesArray = length > 30 ? messagesArray.splice(length - 30, length): messagesArray;

            const newMsg = {
                body: msg,
                id: uuid(),
                sender_id: userId,
                sending_date: new Date().getTime()
            };

            messagesArray.push(newMsg);
            setMsg('');

            db.doc(`rooms/${currentRoom.id}`).update({
                messages: messagesArray
            })
        }
    }

    if(!currentRoom) {
        return <Redirect to="rooms" />
    }

    return (
        <div className="ChatRoom">
            <div className="ChatRoom_info">
                <h4>{currentRoom && currentRoom.data?currentRoom.data().name:null}</h4>
                {currentRoom && currentRoom.data && currentRoom.data().admin_id === userId? (
                    <Link className="setting_btn" to={`settings/${currentRoom.id}`}>
                        <i className="fas fa-user-cog"></i>
                    </Link>
                ): null}
            </div>

            <div className="chatList">
                {currentRoom && currentRoom.data?(
                    currentRoom.data().messages.map(message => <Message key={message.id} msg={message} />)
                ):null}
            </div>
            <form onSubmit={sendMsg} className="msg_form">
                <input
                    value={msg}
                    type="text" 
                    maxLength="100" 
                    onChange={e => setMsg(e.target.value)}
                />
                <button className="submit_btn">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}