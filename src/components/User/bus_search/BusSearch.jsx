import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Buses } from '../../../../utils/index.js';
import BusList from '../busList/BusList.jsx';
import CustomButton from '../../utils/Button.jsx';
// import "./BusSearch.css"

const Container = styled.div`
    background-color: #ADBC9F;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    bottom: 3rem;
`;

const Input = styled.input`
    width: 300px;
    padding: 10px;
    margin-bottom: 1rem;
    border-radius: 16px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

const BusSearch = ({ searchState, setSearchState, selectedDate, setSelectedDate }) => {
    const [filteredBus, setFilteredBus] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        setFilteredBus(
            Buses.filter(
                (data) =>
                    data.source.toLowerCase().includes(searchState.from.toLowerCase()) &&
                    data.destination.toLowerCase().includes(searchState.to.toLowerCase()) &&
                    data.availableDates.includes(searchState.date)
            )
        );
    };

    return (
        <div className='search-bus-container'>
            <Container>
                <h2 className="mb-3" style={{ color: "#12372A" }}>Search Buses</h2>
                <div className="d-flex flex-column align-items-center searchFormStyle">
                    <Input
                        className="mb-3 "
                        type="text"
                        placeholder="Enter Source"
                        value={searchState.from}
                        onChange={(e) => {
                            setSearchState((prevState) => ({
                                ...prevState,
                                from: e.target.value,
                            }));
                        }}
                    />

                    <Input
                        className="mb-3"
                        type="text"
                        placeholder="Enter Destination"
                        value={searchState.to}
                        onChange={(e) => {
                            setSearchState((prevState) => ({
                                ...prevState,
                                to: e.target.value,
                            }));
                        }}
                    />

                    <Input
                        className="mb-3"
                        type="date"
                        value={searchState.date}
                        onChange={(e) => {
                            setSearchState((prevState) => ({
                                ...prevState,
                                date: e.target.value,
                            }));
                            setSelectedDate(e.target.value); // Update selectedDate state
                        }}
                    />
                </div>
                <CustomButton className="mb-3 bus-search-button" onClick={handleSearch}>Search</CustomButton>
                {filteredBus && filteredBus.length > 0 && <BusList buses={filteredBus} />}
                {filteredBus && filteredBus.length < 1 && <p>No buses found</p>}
            </Container>
        </div>
    )
};
export default BusSearch;
