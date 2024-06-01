import './userLoginStyle.css' // Import CSS file for styling
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '../../../../utils/axios'
import toast from 'react-hot-toast'
import axios from 'axios'
import useUserStore from '../../../Store/store'
import { useNavigate } from 'react-router-dom'
const UserLoginPage = () => {
  const navigate = useNavigate()
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password too small'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  })

  const handleSignupClick = () => {
    navigate('/signup')
  }

  const handleResetPasswordClick = () => {
    navigate('/resetpassword')
  }

  const handleLogin = async (data) => {
    try {
      const res = await axiosInstance.post('/user/login', {
        ...data,
      })
      const { name, address, email, age, contact_number } = res.data.data
      toast.success('User logged in successfully')
      navigate('/')
      setUserDetails({ name, address, email, age, contact_number })
      localStorage.setItem('token', res.data.token)
    } catch (error) {
      if (error instanceof axios.AxiosError) toast.error(error.response.data)
    }
  }

  return (
    <div className="user-login-container">
      <h2 className="login-heading">User Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-input"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="error-message">Invalid Email</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            {...register('password')}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <div className="password-reset-container">
        <button
          onClick={handleResetPasswordClick}
          className="password-reset-btn"
        >
          Reset Password
        </button>
      </div>

      <div className="signup-container">
        <p className="signup-text">Don&apos;t have an account?</p>
        <button onClick={handleSignupClick} className="signup-btn">
          Signup
        </button>
      </div>
    </div>
  )
}

export default UserLoginPage
