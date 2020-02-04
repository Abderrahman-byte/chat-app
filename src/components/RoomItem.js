import React from 'react';

import '../styles/RoomItem.scss';

export const RoomItem = ({room}) => {
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
                <i className="fas fa-arrow-right"></i>
            </div>
        </div>
    )
}