import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Buses } from '../../../../utils/index.js'
import BusList from '../busList/BusList.jsx'
import CustomButton from '../../utils/Button.jsx'
import useUserStore from '../../../Store/store.js'

const Container = styled.div`
  background-color: #adbc9f;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  bottom: 3rem;
`

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 16px;
  border: 1px solid #ccc;
  font-size: 16px;
`

const BusSearch = ({
  searchState,
  setSearchState,
  selectedDate,
  setSelectedDate,
}) => {
  const userDetails = useUserStore((state) => state.userDetails)
  const [filteredBus, setFilteredBus] = useState(null)
  const [prices, setPrices] = useState({}) // State to store calculated prices
  // const navigate = useNavigate();

  const getMatchingSourceIndex = (sourceArray, searchFrom) => {
    return sourceArray.findIndex((source) =>
      source.toLowerCase().includes(searchFrom.toLowerCase())
    )
  }

  const getMatchingDestinationIndex = (destinationArray, searchTo) => {
    return destinationArray.findIndex((destination) =>
      destination.toLowerCase().includes(searchTo.toLowerCase())
    )
  }

  const calculatePrice = (bus, sourceIndex, destinationIndex) => {
    const distance =
      bus.distanceFromSource[bus.destination[destinationIndex]] -
      bus.distanceFromSource[bus.source[sourceIndex]]
    return distance * bus.farePerKm
  }

  const handleSearch = () => {
    const filteredBuses = Buses.filter(
      (data) =>
        Array.isArray(data.source) &&
        Array.isArray(data.destination) &&
        data.source.some((place) =>
          place.toLowerCase().includes(searchState.from.toLowerCase())
        ) &&
        data.destination.some((place) =>
          place.toLowerCase().includes(searchState.to.toLowerCase())
        ) &&
        data.availableDates.includes(searchState.date)
    ).map((bus) => {
      const sourceIndex = getMatchingSourceIndex(bus.source, searchState.from)
      const destinationIndex = getMatchingDestinationIndex(
        bus.destination,
        searchState.to
      )
      const price = calculatePrice(bus, sourceIndex, destinationIndex)
      setPrices((prevState) => ({
        ...prevState,
        [bus.id]: price,
      }))

      return {
        ...bus,
        matchingSource: bus.source[sourceIndex] || 'N/A',
        matchingDestination: bus.destination[destinationIndex] || 'N/A',
        matchingDeparture: bus.departureTime
          ? bus.departureTime[sourceIndex]
          : 'N/A',
        matchingArrival: bus.arrivalTime
          ? bus.arrivalTime[destinationIndex]
          : 'N/A',
        price: price, // Add price to the bus object
      }
    })

    setFilteredBus(filteredBuses)
  }

  return (
    <div className="search-bus-container">
      <Container>
        <h2 className="mb-3" style={{ color: '#12372A' }}>
          Search Buses
        </h2>
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
              }))
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
              }))
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
              }))
              setSelectedDate(e.target.value) // Update selectedDate state
            }}
          />
        </div>
        <CustomButton className="mb-3 bus-search-button" onClick={handleSearch}>
          Search
        </CustomButton>
        {filteredBus && filteredBus.length > 0 && (
          <BusList buses={filteredBus} prices={prices} />
        )}
        {filteredBus && filteredBus.length < 1 && <p>No buses found</p>}
      </Container>
    </div>
  )
}

export default BusSearch
