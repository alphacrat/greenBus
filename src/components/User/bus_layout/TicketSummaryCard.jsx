import React from 'react';
import './TicketSummary.css';

const TicketSummaryCard = ({ selectedBus, selectedSeats, selectedDate, farePerSeat }) => {
    const busPrice = farePerSeat || Number(selectedBus?.price);
    const totalCost = selectedSeats.length * busPrice;

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="ticket-summary-card">
            <h3 style={{
                fontWeight: '800',
                color: '#1A4D2E'
            }}>Ticket Summary</h3>
            <div className="mt-2">
                <div className="summary-item">
                    <p className="summary-label">From:</p>
                    <p className="summary-value">{capitalize(selectedBus?.source)}</p>
                </div>
                <div className="summary-item">
                    <p className="summary-label">To:</p>
                    <p className="summary-value">{capitalize(selectedBus?.destination)}</p>
                </div>
                <div className="summary-item">
                    <p className="summary-label">Date:</p>
                    <p className="summary-value">{selectedDate}</p>
                </div>
                <div className="summary-item">
                    <p className="summary-label">Price:</p>
                    <p className="summary-value">₹ {busPrice}</p>
                </div>
                <div className="summary-item">
                    <p className="summary-label">Selected Seats:</p>
                    <p className="summary-value">{selectedSeats.join(', ')}</p>
                </div>
            </div>
            <div className="summary-item total-cost ">
                <p className="summary-label mt-2" style={{ color: '#F5EFE6' }}>Total Cost:</p>
                <p className="summary-value mt-2" style={{ color: '#F5EFE6' }}>₹ {totalCost}</p>
            </div>
        </div>
    );
};

export default TicketSummaryCard;
