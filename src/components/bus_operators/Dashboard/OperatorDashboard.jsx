import React from 'react';
import { Buses } from '../../../../utils/index'; // Import the Buses data
import './OperatorDashboard.css'; // Import CSS file for styling
import { useParams } from 'react-router-dom';

const OperatorDashboard = () => {
    const { name } = useParams();

    // Get all buses with the current operator's name
    const companyBuses = Buses.filter(bus => bus.name === name);

    // Function to handle deleting a bus
    const handleDeleteBus = (busNo) => {
        console.log(`Deleting bus with Bus Number ${busNo}`);
    };

    // Function to handle updating a bus
    const handleUpdateBus = (busNo) => {
        console.log(`Updating bus with Bus Number ${busNo}`);
    };

    // Function to handle operations button click
    const handleOperationFunction = () => {
        window.location.href = `/operator/dashboard/${name}/operations`;
    };

    const today = new Date().toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Get the dates for the last 7 days including today
    const lastSevenDays = [...Array(7)].map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return date.toISOString().slice(0, 10);
    });

    return (
        <div className="operator-dashboard">
            {/* Coordinator Information */}
            <div className="coordinator-info">
                <h2>Coordinator Information</h2>
                {companyBuses.length > 0 && (
                    <p><strong>Name:</strong> {companyBuses[0].coordinatorName}</p>
                )}
            </div>

            {/* Current Running Buses */}
            <div className="current-running-buses">
                <h2>Current Running Buses</h2>
                {companyBuses.map(bus => (
                    <div className="bus-details" key={bus.busNo}>
                        <p><strong>Bus Number:</strong> <span className="highlight">{bus.busNo}</span></p>
                        <div className="bus-info">
                            <p><strong>Source:</strong> {bus.source}</p>
                            <p><strong>Destination:</strong> {bus.destination}</p>
                            <div className="staff-details">
                                <h3>Staff Details</h3>
                                {bus.staff.map(staff => (
                                    <p key={staff.id}><strong>{staff.role}:</strong> {staff.name}</p>
                                ))}
                            </div>
                            <div className="amount-generated">
                                <h3>Amount Generated in Last 7 Days</h3>
                                {lastSevenDays.map(date => (
                                    <div key={date}>
                                        <p><strong>Date:</strong> {date}</p>
                                        <p><strong>Total Amount:</strong> ${bus.totalAmountPerDay[date] || 0}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="OperatorDashboardButtons" onClick={() => handleDeleteBus(bus.busNo)}>Delete Bus</button>
                            <button className=" OperatorDashboardButtons" onClick={() => handleUpdateBus(bus.busNo)}>Update Bus</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Operations Button */}
            <div className="operations">
                <button onClick={handleOperationFunction}>Operations</button>
            </div>
        </div>
    );
};

export default OperatorDashboard;
