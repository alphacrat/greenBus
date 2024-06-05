import { useState } from 'react'
import './AddBus.css'

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
        first: ['', '', '', '', ''],
        second: [
          ['', '', '', '', ''],
          ['', '', '', ''],
        ],
      },
      upper: {
        first: [''],
        second: [],
      },
    },
    availableSeats: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSeatChange = (deck, row, index, e) => {
    const { value } = e.target
    setFormData((prevData) => {
      const newSeatLayout = { ...prevData.seatLayout }
      newSeatLayout[deck][row][index] = parseInt(value)
      return {
        ...prevData,
        seatLayout: newSeatLayout,
      }
    })
  }
  const type = 'sleeper'

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
  }

  return (
    <div className="add-bus-container">
      <h2>Add Bus Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="busNo">Bus Number:</label>
          <input
            type="text"
            id="busNo"
            name="busNo"
            value={formData.busNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Bus Operator Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="departureTime">Departure Time:</label>
          <input
            type="text"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="arrivalTime">Arrival Time:</label>
          <input
            type="text"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="busType">Bus Type:</label>
          <input
            type="text"
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfSeats">Number of Seats:</label>
          <input
            type="number"
            id="numberOfSeats"
            name="numberOfSeats"
            value={formData.numberOfSeats}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Seat Layout:</label>
          <div className="seat-grid">
            {type == 'seater' &&
              Array.from({ length: 30 }, (_, i) => i + 1).map((item) => {
                return <div key={item}>{item}</div>
              })}
          </div>
          {type == 'sleeper' && (
            <div>
              <h1>Upper Deck</h1>
              <div className="seat-grid">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((item) => {
                  return <div key={item}>{item}</div>
                })}
              </div>
              <h1>Lower Deck</h1>
              <div className="seat-grid">
                {Array.from({ length: 15 }, (_, i) => i + 1 + 15).map(
                  (item) => {
                    return <div key={item}>{item}</div>
                  }
                )}
              </div>
            </div>
          )}
          <label htmlFor="availableDates">Available Dates:</label>
          <input
            type="text"
            id="availableDates"
            name="availableDates"
            value={formData.availableDates.join(',')}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddBusForm
