import React, { useState } from 'react';
import './userSignupStyle.css';

const SignupPage = () => {
    const [signupData, setSignupData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        age: '',
        address: ''
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signing up with data:", signupData);
        setTimeout(() => {
            window.location.href = '/'; // or any other desired redirect location
        }, 3000);
    };

    return (
        <div className="signup-page-container mt-10">
            <h2>Signup</h2>
            <form onSubmit={handleSignupSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={signupData.name} onChange={handleSignupChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={signupData.contactNumber} onChange={handleSignupChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={signupData.email} onChange={handleSignupChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" value={signupData.age} onChange={handleSignupChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={signupData.address} onChange={handleSignupChange} required />
                </div>
                <button type="submit" className="signup-btn">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
