import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomButton from '../../utils/Button'
import './BusBookForm.css'
import axiosInstance from '../../../../utils/axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

const BusBookForm = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedSeats = searchParams
    .get('selectedSeats')
    .split(',')
    .map((seat) => parseInt(seat, 10))
  const busId = searchParams.get('busId')
  const date = searchParams.get('date')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { mutate, isPending } = useMutation({
    mutationKey: ['book'],
    mutationFn: async (data) => {
      return await axiosInstance.put(
        `/bus/book/${busId}`,
        {
          ...data,
          selected_seats: selectedSeats,
          date: date,
          source: from,
          destination: to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      toast.success(
        'booking is done successfully. Details are sent to your email'
      )
      navigate('/')
    },
    onError: (error) => {
      if (error instanceof AxiosError) toast.error('OOPs something is wrong')
    },
  })

  const { mutate: mutatePassenger } = useMutation({
    mutationKey: ['passenger'],
    mutationFn: async (data) => {
      return await axiosInstance.post(
        `user/passenger/`,
        {
          ...data,
          age: parseInt(data.age, 10),
          sex: data.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      console.log('successfully created passengers')
    },
    onError: (error) => {
      console.log(error)
      if (error instanceof AxiosError) toast.error('OOPs something is wrong')
    },
  })
  const schema = z.object({
    seats: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        age: z.string().min(1, 'Age is requried'),
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
    mutate(data)
    data.seats.forEach((seat) => {
      mutatePassenger(seat)
    })
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
      {isPending && <h2>Booking on process....</h2>}
    </div>
  )
}

export default BusBookForm
