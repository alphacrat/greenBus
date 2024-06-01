import './styles/App.css'
import Header from './components/User/header/Header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BusSearch from './components/User/bus_search/BusSearch.jsx'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BusLayout from './components/User/bus_layout/BusLayout.jsx'
import BusBookForm from './components/User/bus_booking_form/BusBookForm.jsx'
import UserLogin from './components/User/user_login/UserLogin.jsx'
import SignupPage from './components/User/user_login/UserSignup.jsx'
import BusOperatorLoginPage from './components/bus_operators/login/BusOperatorLoginPage.jsx'
import BusOperatorSignupPage from './components/bus_operators/login/BusOperatorSignUpPage.jsx'
import OperatorDashboard from './components/bus_operators/Dashboard/OperatorDashboard.jsx'
import AddBus from './components/bus_operators/add_bus/AddBus.jsx'
import BusOperations from './components/bus_operators/Dashboard/BusOperations.jsx'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/User/PrivateRoute.jsx'
import { useEffect } from 'react'
import useUserStore from './Store/store.js'
import { toast } from 'react-hot-toast'
import axiosInstance from '../utils/axios.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const resetUserDetails = useUserStore((state) => state.resetUserDetails)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const getToken = async (token) => {
      try {
        const res = await axiosInstance.post('/verify', { token })
        setUserDetails(res.data.data)
      } catch (error) {
        toast.error(error.message)
        resetUserDetails()
      }
    }
    if (token) {
      getToken(token)
    } else {
      resetUserDetails()
    }
  }, [setUserDetails, resetUserDetails])

  const [searchState, setSearchState] = useState({
    from: '',
    to: '',
    date: '',
  })

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState([])

  // State for selected date

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<BusSearch />} />
            <Route
              path="/bus/:id"
              element={
                <PrivateRoute>
                  <BusLayout
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                  />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<UserLogin />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/bus/book"
              element={
                <PrivateRoute>
                  <BusBookForm
                    selectedSeats={selectedSeats}
                    searchState={searchState}
                    setSelectedSeats={setSelectedSeats}
                    setSearchState={setSearchState}
                  />
                </PrivateRoute>
              }
            />

            <Route path="/operator/login" element={<BusOperatorLoginPage />} />

            <Route
              path="/operator/signup"
              element={<BusOperatorSignupPage />}
            />

            <Route
              path="/operator/dashboard/:name"
              element={<OperatorDashboard />}
            />

            <Route
              path="/operator/dashboard/:name/operations"
              element={<BusOperations />}
            />

            <Route path="/operator/dashboard/:name/add" element={<AddBus />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
