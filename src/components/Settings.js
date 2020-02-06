import React, { useContext, useState, useEffect } from 'react';
import { User } from '../context/UserContext';

import '../styles/Settings.scss';
import loading from '../assets/loading.gif';

import { Redirect, useHistory } from 'react-router-dom';
import { db } from '../config/fire';

export const Settings = ({match}) => {
    const {rooms, userId} = useContext(User);
    const [room, setRoom] = useState({});

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [successText, setSuccessText] = useState(null);

    const history = useHistory();

    useEffect(() => {
        setRoom(rooms.find(a => a.id === match.params.id) || {});
        if(rooms.find(a => a.id === match.params.id)) {
            const rm = rooms.find(a => a.id === match.params.id);
            setTitle(rm.data().name)
            setDesc(rm.data().description)
        }
    }, [rooms, match]);

    const updateRoom = (e) => {
        e.preventDefault();

        db.doc(`rooms/${room.id}`).update({
            name: title,
            description: desc
        }).then(() => {
            setSuccessText('upadate success')
        })
    }

    const deleteRoom = () => {
        db.doc(`rooms/${room.id}`).delete();
        history.push('/rooms');
    }

    if(room.data && room.data().admin_id === userId) {
        return (
            <div className="Settings" onSubmit={updateRoom}>
                <h2>Modifie Your Room</h2>
                {successText?(<div className="succes_div">
                    <p>{successText}</p>
                </div>): null}
                <form className="Settings_form">
                    <div className="form_div">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value);
                                setSuccessText('');
                            }}
                            required
                        />
                    </div>

                    <div className="form_div">
                        <label>description</label>
                        <textarea
                            maxLength="50"
                            value={desc}
                            onChange={e => {
                                setDesc(e.target.value);
                                setSuccessText('');
                            }}
                            required
                        />
                    </div>
                    <button className="submit_btn">Submit Changes</button>
                </form>

                <div className="delete_div">
                    <button onClick={deleteRoom}>delete room</button>
                </div>
            </div>
        )
    } else if(room.data && room.data().admin_id !== userId) {
        return (
            <Redirect to="/rooms" />
        )
    } else {
        return (
            <div className="loading">
                <img src={loading} alt="loading animation" />
            </div>
        )
    }
}