import { useNavigate } from 'react-router-dom'
import CustomButton from '../../utils/Button'
import './BusList.css' // Import your custom CSS for styling
import { format } from 'date-fns'

const BusList = ({ buses, formData }) => {
  const navigate = useNavigate()

  const handleButtonClick = (id, price) => {
    const params = new URLSearchParams({
      source: formData.source,
      destination: formData.destination,
      date: formData.date,
      busFare: price,
    })
    navigate(`/bus/${id}?${params.toString()}`)
  }

  return (
    <div className="busListContainer">
      <h2 className="busListHeading">Available Buses</h2>
      {buses.map((bus) => {
        const sourceIndex = bus.source.findIndex(
          (source) => source === formData.source
        )
        const destinationIndex = bus.destination.findIndex(
          (destination) => destination === formData.destination
        )
        const formattedDeparture = format(
          bus.departure_time[sourceIndex],
          'HH:mm'
        )
        const formattedArrival = format(
          bus.arrival_time[destinationIndex],
          'HH:mm'
        )
        const busFare =
          (bus.distance[formData.destination] - bus.distance[formData.source]) *
          bus.fare
        return (
          <div className="busItem" key={bus._id}>
            <div className="busItemContent" style={{ color: '#12372A' }}>
              <h3
                className="busName"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginTop: '5px',
                }}
              >
                {bus.name}
              </h3>
              <div className="busInfo" style={{ fontWeight: '500' }}>
                <p className="busInfoItem">
                  <strong>Source:</strong> {formData.source}
                </p>
                <p className="busInfoItem">
                  <strong>Destination:</strong> {formData.destination}
                </p>
                <p className="busInfoItem">
                  <strong>Departure:</strong> {formattedDeparture}
                </p>
                <p className="busInfoItem">
                  <strong>Arrival:</strong> {formattedArrival}
                </p>
              </div>
            </div>
            <div className="busPriceType">
              <p className="busPrice">
                <strong>Price: ₹</strong> {busFare}
              </p>
              <p className="busType">
                <strong>Type: </strong> {bus.busType}
              </p>
            </div>
            <div className="busActions">
              <h5 className="availableSeats">Available Seats:</h5>
              <CustomButton
                className="bookButton"
                onClick={() => {
                  handleButtonClick(bus._id, busFare)
                }}
              >
                Book Now
              </CustomButton>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BusList
