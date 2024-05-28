import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../utils/Button';
import './BusList.css'; // Import your custom CSS for styling

const BusList = ({ buses }) => {
    const navigate = useNavigate();

    const checkIfUserIsLoggedIn = true;

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleButtonClick = (bus) => {
        const isLoggedIn = checkIfUserIsLoggedIn;
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            // Pass bus details to BusLayout page
            navigate(`/bus/${bus.id}`, {
                state: {
                    busDetails: {
                        source: bus.matchingSource,
                        destination: bus.matchingDestination,
                        farePerSeat: bus.price // Assuming bus.price contains fare per seat
                    }
                }
            });
        }
    };

    if (!buses || buses.length === 0) {
        return <p>No buses found</p>;
    }

    return (
        <div className='busListContainer'>
            <h2 className='busListHeading'>Available Buses</h2>
            {buses.map((bus) => (
                <div className="busItem" key={bus.id}>
                    <div className='busItemContent' style={{ color: '#12372A' }}>
                        <h3 className='busName' style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '5px' }}>{bus.name}</h3>
                        <div className='busInfo' style={{ fontWeight: '500' }}>
                            <p className='busInfoItem'>
                                <strong>Source:</strong> {capitalize(bus.matchingSource)}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Destination:</strong> {capitalize(bus.matchingDestination)}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Departure:</strong> {bus.matchingDeparture}
                            </p>
                            <p className='busInfoItem'>
                                <strong>Arrival:</strong> {bus.matchingArrival}
                            </p>
                        </div>
                    </div>
                    <div className='busPriceType'>
                        <p className='busPrice'>
                            <strong>Price: ₹</strong> {bus.price}
                        </p>
                        <p className='busType'>
                            <strong>Type: </strong> {bus.busType}
                        </p>
                    </div>
                    <div className='busActions'>
                        <h5 className='availableSeats'>Available Seats: {bus.availableSeats.length}</h5>
                        <CustomButton className="bookButton" onClick={() => handleButtonClick(bus)}>Book Now</CustomButton>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BusList;
