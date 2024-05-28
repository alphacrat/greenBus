import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TicketSummaryCard from './TicketSummaryCard';
import { Buses } from '../../../../utils/index.js';
import '../../../styles/App.css';
import CustomButton from '../../utils/Button.jsx';
import './BusLayout.css';

const BusLayout = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedBus, setSelectedBus] = useState(null);
    const [farePerSeat, setFarePerSeat] = useState(0);

    useEffect(() => {
        const busId = parseInt(id);
        const selectedBusData = Buses.find(bus => bus.id === busId);
        setSelectedBus(selectedBusData);

        if (location.state && location.state.busDetails) {
            const { source, destination, farePerSeat } = location.state.busDetails;
            setSelectedBus({
                ...selectedBusData,
                source,
                destination
            });
            setFarePerSeat(farePerSeat);
        }
    }, [id, location.state]);

    if (!selectedBus) {
        return null; // Return null or loading indicator until selectedBus is loaded
    }

    const isSleeper = selectedBus?.busType === 'Sleeper';
    const seatWidth = isSleeper ? '100px' : '25px';

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const matchingSource = selectedBus?.source ? capitalizeFirstLetter(selectedBus.source) : 'Source Not Available';
    const matchingDestination = selectedBus?.destination ? capitalizeFirstLetter(selectedBus.destination) : 'Destination Not Available';

    const isSeatAvailable = (seat) => selectedBus?.availableSeats.includes(seat);

    const selectSeat = (seat) => {
        if (isSeatAvailable(seat)) {
            setSelectedSeats(prevSeats => {
                if (prevSeats.includes(seat)) {
                    return prevSeats.filter((selectedSeat) => selectedSeat !== seat);
                } else {
                    return [...prevSeats, seat];
                }
            });
        }
    };

    const isSeatSelected = (seat) => selectedSeats.includes(seat);

    const GenerateSeats = React.memo(({ propArray, berth }) => {
        return propArray.map((seats, index) =>
            Array.isArray(seats) ? (
                <div className="d-flex bus-berth" key={index}>
                    {seats.map((seat) => (
                        <li
                            className="busLayoutTicketItem"
                            style={{
                                fontWeight: '600',
                                paddingTop: '5px',
                                width: seatWidth,
                                background: isSeatSelected(`${berth}${seat}`)
                                    ? '#318beb'
                                    : isSeatAvailable(`${berth}${seat}`)
                                        ? '#fff'
                                        : '#1B3E2D',
                                color: isSeatAvailable(`${berth}${seat}`)
                                    ? 'black'
                                    : '#F5EFE6',
                                cursor: isSeatAvailable(`${berth}${seat}`) ? "pointer" : "",
                            }}
                            key={seat}
                            onClick={() => selectSeat(`${berth}${seat}`)}
                        >
                            {berth}
                            {seat}
                        </li>
                    ))}
                </div>
            ) : (
                <li
                    className="busLayoutTicketItem"
                    style={{
                        fontWeight: '600',
                        paddingTop: '5px',
                        width: seatWidth,
                        background: isSeatSelected(`${berth}${seats}`)
                            ? '#318beb'
                            : isSeatAvailable(`${berth}${seats}`)
                                ? '#fff'
                                : '#1B3E2D',
                        cursor: isSeatAvailable(`${berth}${seats}`) ? "pointer" : "",
                        color: isSeatAvailable(`${berth}${seats}`)
                            ? 'black'
                            : '#F5EFE6',
                    }}
                    onClick={() => selectSeat(`${berth}${seats}`)}
                    key={seats}
                >
                    {berth}
                    {seats}
                </li>
            )
        );
    });

    return (
        <div className="busLayoutMainContainer">
            <div className="busLayoutContainer">
                <div className="Layout-Header">
                    <h2 className='Layout-Header-name'>{selectedBus?.name}</h2>
                    <h5 className='Layout-Header-busNo'>{selectedBus?.busNo}</h5>
                </div>
                <h5 className='busType'> Bus Type : {selectedBus?.busType}</h5>
                <div className="d-flex">
                    <div className="custom-d-flex">
                        <h6 style={{ fontWeight: '600' }}>Available Seats : </h6>
                        <li className="busLayoutTicketItem" style={{ width: seatWidth, backgroundColor: '#F5EFE6', color: 'black', fontWeight: '600' }}>
                            {1}
                        </li>
                    </div>

                    <div className="custom-d-flex ms-4">
                        <h6>Booked : </h6>
                        <li className="busLayoutTicketItem" style={{ width: seatWidth, backgroundColor: '#1B3E2D', fontWeight: '600' }}>
                            {2}
                        </li>
                    </div>

                    <div className="custom-d-flex ms-4">
                        <h6>Selected : </h6>
                        <li className="busLayoutTicketItem" style={{ width: seatWidth, backgroundColor: '#318beb', color: 'black', fontWeight: '600' }}>
                            {1}
                        </li>
                    </div>
                </div>
                <div className='Seat-Summary'>
                    <div className='seats'>
                        <ul className="custom-d-flex flex-wrap">
                            {isSleeper ? (
                                <>
                                    <div className="busLayoutTicketContainer align-items-center">
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', paddingTop: '1rem' }}>
                                            <h6 className='Berth-Name'>Upper Deck</h6>
                                            <div className="bus-seat-upper">
                                                <GenerateSeats propArray={selectedBus.seatLayout.upper.first} berth='U' />
                                                <div className="d-flex flex-wrap mt-4 bus-berth-single">
                                                    <GenerateSeats propArray={selectedBus.seatLayout.upper.second} berth='U' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5" style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                            <h6 className="Berth-Name">Lower Deck</h6>
                                            <div className="d-flex bus-seat-lower">
                                                <GenerateSeats propArray={selectedBus.seatLayout.lower.first} berth='L' />
                                                <div className="d-flex flex-wrap mt-4 bus-berth-single">
                                                    <GenerateSeats propArray={selectedBus.seatLayout.lower.second} berth='L' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="busLayoutTicketContainer d-flex align-items-center">
                                    <div>Seater</div>
                                    <div>
                                        <GenerateSeats propArray={selectedBus.seatLayout.first} berth='' />
                                        <div className="mt-4">
                                            <GenerateSeats propArray={selectedBus.seatLayout.second} berth='' />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className='ticket-summary'>
                        <TicketSummaryCard
                            selectedBus={selectedBus}
                            selectedSeats={selectedSeats}
                            selectedDate={selectedDate}
                            farePerSeat={farePerSeat}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <div style={{ background: '#9AC8CD', padding: '10px', borderRadius: "10px", alignContent: "center", justifyContent: 'center', color: 'black' }}>
                        {selectedSeats?.length > 0 && <h4 className='mt-2'> Selected Seats - {selectedSeats.join(" , ")} </h4>}
                    </div>
                </div>
                <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomButton
                        onClick={() => navigate('/busbookform', {
                            state: {
                                selectedSeats: selectedSeats,
                                searchState: {
                                    from: location.state.busDetails.source,
                                    to: location.state.busDetails.destination,
                                    date: location.state.busDetails.date
                                }
                            }
                        })}
                    >
                        Proceed
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BusLayout;
