import React, { useState } from 'react';
import './AddBus.css';

const AddBusForm = () => {
    const [formData, setFormData] = useState({
        busNo: '',
        name: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        availableDates: [],
        busType: '',
        numberOfSeats: 0,
        seatLayout: {
            lower: {
                first: ["", "", "", "", ""],
                second: [["", "", "", "", ""], ["", "", "", ""]]
            },
            upper: {
                first: ["",],
                second: []
            }
        },
        availableSeats: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSeatChange = (deck, row, index, e) => {
        const { value } = e.target;
        setFormData(prevData => {
            const newSeatLayout = { ...prevData.seatLayout };
            newSeatLayout[deck][row][index] = parseInt(value);
            return {
                ...prevData,
                seatLayout: newSeatLayout
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
    };

    return (
        <div className="add-bus-container">
            <h2>Add Bus Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="busNo">Bus Number:</label>
                    <input type="text" id="busNo" name="busNo" value={formData.busNo} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="name">Bus Operator Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="source">Source:</label>
                    <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="destination">Destination:</label>
                    <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="departureTime">Departure Time:</label>
                    <input type="text" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="arrivalTime">Arrival Time:</label>
                    <input type="text" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="busType">Bus Type:</label>
                    <input type="text" id="busType" name="busType" value={formData.busType} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="numberOfSeats">Number of Seats:</label>
                    <input type="number" id="numberOfSeats" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} required />
                </div>
                <div>
                    <label>Seat Layout:</label>
                    <div className='add-bus-flex'>
                        <div>
                            <label>Lower Deck First Row:</label>
                            {formData.seatLayout.lower.first.map((seat, index) => (
                                <input key={index} type="number" value={seat} onChange={(e) => handleSeatChange('lower', 'first', index, e)} />
                            ))}
                        </div>
                        <div>
                            <label>Lower Deck Second Row:</label>
                            {formData.seatLayout.lower.second.map((seat, index) => (
                                <input key={index} type="number" value={seat} onChange={(e) => handleSeatChange('lower', 'second', index, e)} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Upper Deck First Row:</label>
                        {formData.seatLayout.upper.first.map((seat, index) => (
                            <input key={index} type="number" value={seat} onChange={(e) => handleSeatChange('upper', 'first', index, e)} />
                        ))}
                    </div>
                    <div>
                        <label>Upper Deck Second Row:</label>
                        {formData.seatLayout.upper.second.map((seat, index) => (
                            <input key={index} type="number" value={seat} onChange={(e) => handleSeatChange('upper', 'second', index, e)} />
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="availableDates">Available Dates:</label>
                    <input type="text" id="availableDates" name="availableDates" value={formData.availableDates.join(',')} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBusForm;
