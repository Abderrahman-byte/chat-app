import React, { useContext, useState, useEffect } from 'react';

import '../styles/RoomsList.scss';

import { User } from '../context/UserContext';
import { RoomItem } from './RoomItem';

export const RoomsList = () => {
    const { rooms } = useContext(User);

    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const indexOfEnd = currentPage * itemsPerPage;
        const indexOfStart = indexOfEnd - itemsPerPage;
        const data = rooms.slice(indexOfStart, indexOfEnd);
        setCurrentData(data)
    }, [rooms, currentPage, itemsPerPage]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    
    const roomsListComponent = currentData.map(room => <RoomItem key={room.id} room={room} />)

    return (
        <div className="RoomsList">
            <h3>List of chat rooms</h3>
            {rooms.length > 0? roomsListComponent: (<div className="emty_warning">
                <p>No Chat Rooms for the time but you can create one.</p>
            </div>)}

            {rooms.length > itemsPerPage && (
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage <= 1}><i className="fas fa-chevron-left"></i></button>
                    <span>{currentPage} </span>
                    <button onClick={nextPage} disabled={currentPage >= rooms.length / itemsPerPage}><i className="fas fa-chevron-right"></i></button>
                </div>
            )}
        </div>
    )
}