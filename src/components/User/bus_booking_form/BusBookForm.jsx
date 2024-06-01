import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomButton from '../../utils/Button'
import './BusBookForm.css'

const BusBookForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedSeats = searchParams.get('selectedSeats').split(',')
  const busId = searchParams.get('busId')
  const date = searchParams.get('date')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const schema = z.object({
    seats: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        age: z.string().min(1, 'Age should be at provided'),
        gender: z.string().min(1, 'Gender is required'),
      })
    ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="bus-book-form-container">
      <div className="bus-details">
        <h5>From : {from} </h5>
        <h5>To : {to}</h5>
        <h5>Date: {date}</h5>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <h5>Please Fill the Details below</h5>
          {selectedSeats.map((seat, index) => (
            <div key={index} className="seat-details">
              <div className="seat-number">Seat No: {seat}</div>
              <div className="input-fields">
                <label>Name:</label>
                <input
                  className="name-input"
                  type="text"
                  placeholder="Name"
                  {...register(`seats.${index}.name`)}
                />
                {errors.seats?.[index]?.name && (
                  <p>{errors.seats[index].name.message}</p>
                )}
                <label>Age:</label>
                <input
                  className="age-input"
                  type="number"
                  placeholder="Age"
                  {...register(`seats.${index}.age`)}
                />
                {errors.seats?.[index]?.age && (
                  <p>{errors.seats[index].age.message}</p>
                )}
                <label>Gender:</label>
                <input
                  className="age-input"
                  type="text"
                  placeholder="gender"
                  {...register(`seats.${index}.gender`)}
                />
                {errors.seats?.[index]?.gender && (
                  <p>{errors.seats[index].gender.message}</p>
                )}
              </div>
            </div>
          ))}
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default BusBookForm
