import { useQuery } from '@tanstack/react-query'
import './OperatorDashboard.css' // Import CSS file for styling
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../../utils/axios'

const OperatorDashboard = () => {
  const { name } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllbus'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bus/allBuses/${name}`)
      return res.data
    },
  })
  if (isLoading) return <h1>Loading...</h1>
  if (error) {
    console.log(error)
  }
  if (!data) {
    return <div>No buses to display</div>
  }
  return (
    <div className="operator-dashboard">
      {/* Coordinator Information */}
      <div className="coordinator-info">
        <h2>Coordinator Information</h2>
        <p>
          <strong>Name:</strong> {data?.operator_data.coordinator_name}
        </p>
      </div>

      {/* Current Running Buses */}
      <div className="current-running-buses">
        <h2>Current Running Buses</h2>
        {data?.data.map((bus) => (
          <div className="bus-details" key={bus.busNo}>
            <p>
              <strong>Bus Number:</strong>{' '}
              <span className="highlight">{bus.busNo}</span>
            </p>
            <div className="bus-info">
              <p>
                <strong>Source:</strong> {bus.source.join(', ')}
              </p>
              <p>
                <strong>Destination:</strong> {bus.destination.join(', ')}
              </p>
              <div className="staff-details">
                <h3>Staff Details</h3>
                {bus.staff.map((staff) => (
                  <p key={staff.id}>
                    <strong>{staff.role}:</strong> {staff.name}
                  </p>
                ))}
              </div>
              <div>
                <h3>Total Seats: {bus.total_seats}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="operations">
        <button onClick={() => {}}>Operations</button>
      </div>
    </div>
  )
}

export default OperatorDashboard
