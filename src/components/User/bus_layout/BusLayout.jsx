import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Buses } from '../../../../utils/index.js';
import '../../../styles/App.css';
import CustomButton from '../../utils/Button.jsx';
import TicketSummaryCard from './TicketSummaryCard.jsx'; // Import the TicketSummaryCard component
import './BusLayout.css'; // Import the CSS file for BusLayout

const BusLayout = ({ selectedSeats, setSelectedSeats, selectedDate }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedBus = useMemo(() => Buses.find((data) => data.id === parseInt(id)), [id]);
    const isSleeper = selectedBus.busType === 'Sleeper';
    const seatWidth = isSleeper ? '100px' : '25px';

    const isSeatAvailable = useCallback((seat) => selectedBus.availableSeats.includes(seat), [selectedBus]);

    const selectSeat = useCallback((seat) => {
        if (isSeatAvailable(seat)) {
            setSelectedSeats(prevSeats => {
                if (prevSeats.includes(seat)) {
                    return prevSeats.filter((selectedSeat) => selectedSeat !== seat);
                } else {
                    return [...prevSeats, seat];
                }
            });
        }
    }, [isSeatAvailable, setSelectedSeats]);

    const isSeatSelected = useCallback((seat) => selectedSeats.includes(seat), [selectedSeats]);

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
                    className="busLayoutTicketItem "
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
                    <h2 className='Layout-Header-name'>{selectedBus.name}</h2>
                    <h5 className='Layout-Header-busNo'>{selectedBus.busNo}</h5>
                </div>
                <h5 className='busType'> Bus Type : {selectedBus.busType}</h5>
                <div className="d-flex" style={{}}>
                    <div className="custom-d-flex  ">
                        <h6 style={{ fontWeight: '600' }}>Available Seats : </h6>
                        <li className="busLayoutTicketItem " style={{ width: seatWidth, backgroundColor: '#F5EFE6', color: 'black', fontWeight: '600' }}>
                            {1}
                        </li>
                    </div>

                    <div className="custom-d-flex ms-4 ">
                        <h6>Booked : </h6>
                        <li className="busLayoutTicketItem" style={{ width: seatWidth, backgroundColor: '#1B3E2D', fontWeight: '600' }}>
                            {2}
                        </li>
                    </div>

                    <div className="custom-d-flex ms-4 ">
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
                                            <h6 className='Berth-Name'>Upper</h6>
                                            <div className="bus-seat-upper">
                                                <GenerateSeats propArray={selectedBus.seatLayout.upper.first} berth='U' />
                                                <div className="d-flex flex-wrap mt-4 bus-berth-single">
                                                    <GenerateSeats propArray={selectedBus.seatLayout.upper.second} berth='U' />
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', paddingTop: '40px' }}>
                                            <h6 className="Berth-Name">Lower</h6>
                                            <div className="d-flex  bus-seat-lower">
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
                    <TicketSummaryCard selectedBus={selectedBus} selectedSeats={selectedSeats} selectedDate={selectedDate} />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <div style={{ background: '#9AC8CD', padding: '10px', borderRadius: "10px", alignContent: "center", justifyContent: 'center', color: 'black' }}>
                        {selectedSeats?.length > 0 && <h4 className='mt-2'> Selected Seats - {selectedSeats.join(" , ")} </h4>}
                    </div>
                </div>
                <div className="mt-4" style={{
                    display: 'flex', justifyContent: 'center'
                }}>
                    <CustomButton
                        className='Proceed-Button'
                        onClick={() => navigate('/bus/book')}
                        disabled={!(selectedSeats && selectedSeats.length > 0)}
                    >
                        Proceed
                    </CustomButton>
                </div>
            </div >
        </div >
    );
};

export default BusLayout;
