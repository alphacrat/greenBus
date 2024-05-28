import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../../utils/Button';
import './BusBookForm.css';

const BusBookForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedSeats, searchState } = location.state || { selectedSeats: [], searchState: {} };

    return (
        <div className='bus-book-form-container'>
            <div className='bus-details'>
                <h5>From : {searchState.from} </h5>
                <h5>To : {searchState.to}</h5>
                <h5>Date: {searchState.date}</h5>
            </div>

            <div className='form-container'>
                <h5>Please Fill the Details below</h5>
                {selectedSeats.map((data, index) => (
                    <div key={index} className='seat-details'>
                        <div className='seat-number'>
                            Seat No: {data}
                        </div>
                        <div className='input-fields'>
                            <label>Name:</label>
                            <input
                                className='name-input'
                                type='text'
                                placeholder='Name'
                            />
                            <label>Age:</label>
                            <input
                                className='age-input'
                                type='number'
                                placeholder='Age'
                            />
                            <label>Gender:</label>
                            <input
                                className='age-input'
                                type='text'
                                placeholder='gender'
                            />
                        </div>
                    </div>
                ))}

                <CustomButton
                    className='proceed-button'
                    onClick={() => {
                        alert('Please Proceed For the Payments');
                        navigate('/');
                    }}
                >
                    Proceed
                </CustomButton>
            </div>
        </div>
    );
};

export default BusBookForm;
