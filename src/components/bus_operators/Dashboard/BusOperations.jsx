import React from 'react';
import { Buses } from '../../../../utils/index'; // Import the Buses data
import './BusOperations.css'; // Import CSS file for styling
import { useParams } from 'react-router-dom';

const BusOperations = () => {
    const { name } = useParams();

    const companyBuses = Buses.filter(bus => bus.name === name);

    const handleDeleteBus = (busNo) => {
        console.log(`Deleting bus with Bus Number ${busNo}`);
    };

    const handleUpdateBus = (busNo) => {
        console.log(`Updating bus with Bus Number ${busNo}`);
    };

    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Get the dates for the next seven days
    const nextSevenDays = [...Array(7)].map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date.toISOString().slice(0, 10);
    });

    const busesForDays = nextSevenDays.map(date => {
        const label = new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        const isToday = date === today;
        const isTomorrow = date === tomorrow;
        return { date, label, isToday, isTomorrow };
    });

    return (
        <div className="operator-dashboard">
            <div className="schedule-container">
                {busesForDays.map(({ date, label, isToday, isTomorrow }) => (
                    <div key={date} className="schedule-day">
                        <div className='day-div'>
                            <h2 className='label-design'>{label}</h2>
                            {isToday && <span className="today-tag">Today</span>}

                            {isTomorrow && <span className="tomorrow-tag">Tomorrow</span>}
                        </div>
                        {companyBuses.filter(bus => bus.availableDates.includes(date)).length > 0 ? (
                            companyBuses.filter(bus => bus.availableDates.includes(date)).map(bus => (
                                <div key={bus.busNo} className="bus-card">
                                    <h4><strong>Bus Number:</strong> {bus.busNo}</h4>
                                    <p><strong>Source:</strong> {bus.source}</p>
                                    <p><strong>Destination:</strong> {bus.destination}</p>
                                    <p><strong>Departure Time:</strong> {bus.departureTime}</p>
                                    <p><strong>Arrival Time:</strong> {bus.arrivalTime}</p>
                                    <p><strong>Price:</strong> {bus.price}</p>
                                    <p><strong>Bus Type:</strong> {bus.busType}</p>
                                    <p><strong>Available Seats:</strong> {bus.availableSeats.join(', ')}</p>
                                    <div className="seat-layout">
                                        <p><strong>Seat Layout:</strong></p>
                                        {bus.seatLayout && bus.seatLayout.lower && bus.seatLayout.lower.first &&
                                            <p><strong>Lower:</strong> {bus.seatLayout.lower.first.join(', ')}, {bus.seatLayout.lower.second.join(', ')}</p>
                                        }
                                        {bus.seatLayout && bus.seatLayout.upper && bus.seatLayout.upper.first &&
                                            <p><strong>Upper:</strong> {bus.seatLayout.upper.first.join(', ')}, {bus.seatLayout.upper.second.join(', ')}</p>
                                        }
                                    </div>
                                    <div className="buttonContainer">
                                        <div className="bus-buttons">
                                            <button className=" BusOperationButtons" onClick={() => handleDeleteBus(bus.busNo)}>Delete Bus</button>
                                            <button className=" BusOperationButtons" onClick={() => handleUpdateBus(bus.busNo)}>Update Bus</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No buses found for {label}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusOperations;
