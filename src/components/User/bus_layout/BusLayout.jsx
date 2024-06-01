import { useQuery } from '@tanstack/react-query'
import './BusLayout.css'
import axiosInstance from '../../../../utils/axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isSameDay } from 'date-fns'
import CustomButton from '../../utils/Button'
const BusLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const { id } = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const date = searchParams.get('date')
  const source = searchParams.get('source')
  const destination = searchParams.get('destination')
  const busFare = searchParams.get('busFare')
  console.log(date)
  const { isLoading, data } = useQuery({
    queryKey: ['bus'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bus/${id}`)
      return res.data.data.bus
    },
  })
  if (isLoading) return <h1>Loading..</h1>

  let allBookedSeats = []
  if (data && data.available_dates) {
    const selectedDate = data.available_dates.find((d) =>
      isSameDay(d.date, date)
    )
    if (selectedDate) {
      allBookedSeats = selectedDate.booked_seats
    }
  }

  return (
    <div>
      <h1>{data.bus_no}</h1>
      <h2>{data.bus_type}</h2>
      <h2>Seats</h2>
      <div className="bus_layout_availabe_seats">
        <div>
          <h3>Available</h3>
          <h3>{data.total_seats - allBookedSeats.length}</h3>
        </div>
        <div>
          <h3>Booked</h3>
          <h3>{allBookedSeats.length}</h3>
        </div>
        <div>
          <h3>Selected</h3>
          <h3>{selectedSeats.length}</h3>
        </div>
      </div>
      <div className="bus_layout_flex">
        <div className="bus_layout_seat_container">
          {Array(data.total_seats)
            .fill(0)
            .map((_, index) => {
              const isBooked = allBookedSeats.includes(index + 1)
              const isSelected = selectedSeats.includes(index + 1)
              return (
                <div
                  key={index}
                  className={`bus_layout_seats ${
                    isBooked ? 'bus_layout_booked' : ''
                  } ${isSelected ? 'bus_layout_selected' : ''}`}
                  onClick={() => {
                    if (!isBooked) {
                      if (isSelected) {
                        const selectedSeatsCopy = [...selectedSeats]
                        const seatIndex = selectedSeatsCopy.findIndex(
                          (seat) => seat == index + 1
                        )
                        selectedSeatsCopy.splice(seatIndex, 1)
                        setSelectedSeats(selectedSeatsCopy)
                        return
                      }
                      setSelectedSeats((prev) => [...prev, index + 1])
                    }
                  }}
                >
                  {index + 1}
                </div>
              )
            })}
        </div>
        <div>
          <h2>Ticket Summary</h2>
          <p>From {source}</p>
          <p>To {destination}</p>
          <p
            style={{
              width: '300px',
            }}
          >
            Selected Seats: {selectedSeats.join(', ')}
          </p>
          <p>Total Cose: {busFare * selectedSeats.length}</p>
        </div>
      </div>
      <CustomButton>Proceed</CustomButton>
    </div>
  )
}

export default BusLayout
