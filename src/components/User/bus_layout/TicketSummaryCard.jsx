import React from 'react';
import './TicketSummary.css'; // Import CSS for styling

const TicketSummaryCard = ({ selectedBus, selectedSeats, selectedDate }) => {
    const busPrice = Number(selectedBus.price);
    const totalCost = selectedSeats.length * busPrice;

    return (
        <div className="ticket-summary-card">
            <h3 style={{
                fontWeight: 'bold',
                color: '#1A4D2E'

            }}>Ticket Summary</h3>
            <div className="summary-item">
                <p className="summary-label">From:</p>
                <p className="summary-value">{selectedBus.source}</p>
            </div>
            <div className="summary-item">
                <p className="summary-label">To:</p>
                <p className="summary-value">{selectedBus.destination}</p>
            </div>
            <div className="summary-item">
                <p className="summary-label">Date:</p>
                <p className="summary-value">{selectedDate}</p>
            </div>
            <div className="summary-item">
                <p className="summary-label">Selected Seats:</p>
                <p className="summary-value">{selectedSeats.join(', ')}</p>
            </div>
            <div className="summary-item total-cost ">
                <p className="summary-label mt-1" style={{ color: '#F5EFE6' }}>Total Cost:</p>
                <p className="summary-value mt-1" style={{ color: '#F5EFE6' }}>₹ {totalCost}</p>
            </div>
        </div>
    );
};

export default TicketSummaryCard;
