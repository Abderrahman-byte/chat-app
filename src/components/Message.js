import React, { useState, useEffect, useContext } from 'react';
import { db } from '../config/fire';
import { User } from '../context/UserContext';

import '../styles/Message.scss';
import unknownAvatar from '../assets/unknown-avatar.jpg';

export const Message = ({msg}) => {
    const [msgSender, setMsgSender] = useState({});
    const { userId } = useContext(User);

    useEffect(() => {
        db.doc(`users/${msg.sender_id}`).get()
        .then(doc => {
            setMsgSender(doc.data() || {})
        })
    }, [msg]);

    const getStringDate = (miliSec) => {
        let dateStr = "";
        const today = new Date();
        let day = new Date(miliSec).getDate();
        let month = new Date(miliSec).getMonth();
        let year = new Date(miliSec).getFullYear();

        const check = today.getDate() === day && today.getMonth() === month && year === today.getFullYear();

        if(check) {
            dateStr = new Date(miliSec).toTimeString().substr(0, 5)
        } else {
            month = month < 10 ? "0" + month: month;
            day = day < 10 ? "0" + day: day;

            dateStr = `${day}/${month}/${year}  ${new Date(miliSec).toTimeString().substr(0, 5)}`
        }

        return dateStr;
    }

    if(msg.sender_id === userId) {
        return (
            <div className="Message_current_user">
                <div className="date">
                    {getStringDate(msg.sending_date)}
                </div>
                <div className="body">
                    <span>{msgSender.pseudo} :</span>
                    <p>{msg.body} </p>
                </div>
            </div>
        )
    }

    return (
        <div className="Message">
            <div className="sender_avatar_div">
                <img src={msgSender.avatar || unknownAvatar} alt="user avatar" />
            </div>
            <div className="body">
                <span>{msgSender.pseudo || "............"} :</span>
                <p>{msg.body} </p>
            </div>
            <div className="date">
                {getStringDate(msg.sending_date)}
            </div>
        </div>
    )
}