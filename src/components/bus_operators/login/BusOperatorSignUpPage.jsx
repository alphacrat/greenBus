import './BusOperatorSignUpPage.css' // Import CSS file for styling
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axiosInstance from '../../../../utils/axios'
import { useNavigate } from 'react-router-dom'

const operatorRegisterSchema = z.object({
  coordinator_name: z.string().min(1, 'Coordinator name is required'),
  company_name: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  token: z.string().min(1, 'Token is required'),
  address: z.string().min(1, 'Address is required'),
  contact_number: z
    .string()
    .min(10, 'Contact number must be at least 10 characters'),
  years_of_service: z.string().min(1, 'years of service must be provided'),
})

const BusOperatorSignupPage = () => {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['operator register'],
    mutationFn: async (data) => {
      const res = await axiosInstance.post('/operator/register', data)
      return res.data
    },
    onSuccess: () => {
      navigate('/operator/login')
    },
  })
  const handleSignupSubmit = (data) => {
    const { years_of_service } = data
    data.years_of_service = parseInt(years_of_service, 10)
    mutate(data)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(operatorRegisterSchema),
  })

  if (error) {
    console.log(error)
  }

  return (
    <div className="bus-operator-signup-container">
      <h2>Bus Operator Signup</h2>
      <form onSubmit={handleSubmit(handleSignupSubmit)} className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="custom-input"
            {...register('company_name')}
          />
          {errors.company_name && <p>{errors.company_name.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="contactPersonName">Contact Person Name:</label>
          <input
            type="text"
            id="contactPersonName"
            name="contactPersonName"
            className="custom-input"
            {...register('coordinator_name')}
          />
          {errors.coordinator_name && <p>{errors.coordinator_name.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="custom-input"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="custom-input"
            {...register('contact_number')}
          />
          {errors.contact_number && <p>{errors.contact_number.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            className="custom-input"
            {...register('address')}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="yearsOfService">Years of Service:</label>
          <input
            type="text"
            id="yearsOfService"
            name="yearsOfService"
            className="custom-input"
            {...register('years_of_service')}
          />
          {errors.years_of_service && <p>{errors.years_of_service.message}</p>}
        </div>
        <div className="signup-form-group">
          <label htmlFor="token">Token</label>
          <input
            type="text"
            id="token"
            name="token"
            className="custom-input"
            {...register('token')}
          />
          {errors.token && <p>{errors.token.message}</p>}
        </div>
        <button type="submit" className="signup-btn">
          Signup
        </button>
      </form>
      {isPending && <h2>Loading...</h2>}
    </div>
  )
}

export default BusOperatorSignupPage
