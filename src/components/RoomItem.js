import React, { useContext } from 'react';

import '../styles/RoomItem.scss';

import { User } from '../context/UserContext';
import { useHistory, Link } from 'react-router-dom';

export const RoomItem = ({room}) => {
    const { changeRoom, userId } = useContext(User);
    const history = useHistory();

    const data = room.data();
    const creationDate = new Date(Number(data.creating_date));
    const creationDay = creationDate.toDateString().substring(8,10);
    const creationYear = creationDate.toDateString().substring(11,15);
    let creationMonth = creationDate.getMonth();
    creationMonth = creationMonth < 10 ? "0" + creationMonth: creationMonth;

    return (
        <div className="RoomItem">
            <div className="RoomItem_pt_1">
                <h4>{data.name}</h4>
                <p className="desc">{data.description}</p>
                <p className="date">created date: {creationDay + "/" + creationMonth + "/" + creationYear}</p>
            </div>
            <div className="RoomItem_pt_2">
                <button onClick={() => {
                    changeRoom(room.id)
                    history.push('/chat');
                }}>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>

            {room.data().admin_id  === userId?(
                <Link className="settings">
                    <i className="fas fa-user-cog"></i>
                </Link>
            ): null}
            
        </div>
    )
}