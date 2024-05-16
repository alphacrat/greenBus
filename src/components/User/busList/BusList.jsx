import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../utils/Button';
import './BusList.css'; // Import your custom CSS for styling

const BusList = ({ buses }) => {
    const navigate = useNavigate();

    const checkIfUserIsLoggedIn = true;

    const handleButtonClick = (busId) => {
        const isLoggedIn = checkIfUserIsLoggedIn;
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate(`bus/${busId}`);
        }
    };

    return (
        <div className='busListContainer'>
            <h2 className='busListHeading'>Available Buses</h2>
            {buses.map((bus) => (
                <div className="busItem" key={bus.id}>
                    <div className='busItemContent' style={{ color: '#12372A' }}>
                        <h3 className='busName' style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '5px' }}>{bus.name}</h3>
                        <div className='busInfo' style={{ fontWeight: '500' }} >
                            <p className='busInfoItem'>
                                <strong>Source:</strong> {bus.source}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Destination:</strong> {bus.destination}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Departure:</strong> {bus.departureTime}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Arrival:</strong> {bus.arrivalTime}
                            </p>
                        </div>
                    </div>
                    <div className='busPriceType'>
                        <p className='busPrice' >
                            <strong>Price: ₹</strong> {bus.price}
                        </p>
                        <p className='busType'>
                            <strong>Type: </strong> {bus.busType}
                        </p>
                    </div>
                    <div className='busActions'>
                        <h5 className='availableSeats'>Available Seats: {bus.availableSeats.length}</h5>
                        <CustomButton className="bookButton" onClick={() => handleButtonClick(bus.id)}>Book Now</CustomButton>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default BusList;
