import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import './BusOperatorLoginPage.css'
import axiosInstance from '../../../../utils/axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import useUserStore from '../../../Store/store'
// Define your schema
const schema = z.object({
  email: z.string().email('Invalid email address'),
  token: z.string().min(1, 'Token is required'),
  company_name: z.string().min(1, 'Bus Operator Name is required'),
})

const BusOperatorLoginPage = () => {
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const navigate = useNavigate()
  const getLogin = async (data) => {
    const res = await axiosInstance.post('/operator/login', data)
    return res.data
  }
  const { mutate, error } = useMutation({
    mutationKey: ['operator login'],
    mutationFn: getLogin,
    onSuccess: (data) => {
      setUserDetails({ ...data.data })
      navigate(`/operator/dashboard/${data.data.company_name}`)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleLoginSubmit = (data) => {
    mutate(data)
    // navigate('/operator/dashboard')
  }

  if (error instanceof AxiosError) {
    toast.error(error.response.data)
  }

  return (
    <div>
      <div className="bus-operator-login-container">
        <h2>Bus Operator Login</h2>
        <form onSubmit={handleSubmit(handleLoginSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="token">Token:</label>
            <input type="text" {...register('token')} />
            {errors.token && <p>{errors.token.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="busOperatorName">Bus Operator Name:</label>
            <input type="text" {...register('company_name')} />
            {errors.company_name && <p>{errors.company_name.message}</p>}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
      <div className="partner-section"></div>
    </div>
  )
}

export default BusOperatorLoginPage
