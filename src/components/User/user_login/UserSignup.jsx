import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './userSignupStyle.css'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

// Define your schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  contact_number: z.string().length(10, 'Contact Number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  age: z.string().min(1, 'Age should be at least 1'),
  password: z.string().min(3, 'Must be 3 digits long'),
})

const SignupPage = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data) => {
      return axiosInstance.post('/user/register', data)
    },
    onSuccess: () => {
      toast.success('User registered successfully')
      navigate(-2)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('OOPs something wrong')
      }
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleSignupSubmit = (data) => {
    data.age = parseInt(data.age, 10)
    mutate(data)
  }

  return (
    <div className="signup-page-container mt-10">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(handleSignupSubmit)} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" {...register('contact_number')} />
          {errors.contact_number && <p>{errors.contact_number.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="address" {...register('address')} />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" {...register('age')} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="age">password:</label>
          <input type="password" {...register('password')} />
          {errors.age && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignupPage
