import { useNavigate } from 'react-router-dom'
import useUserStore from '../../Store/store'
import { useEffect } from 'react'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const userDetails = useUserStore((state) => state.userDetails)
  useEffect(() => {
    if (!userDetails.name && !userDetails.email && !userDetails.loading)
      navigate('/login')
  }, [userDetails, navigate])
  if (userDetails.loading) {
    return <div>Loading....</div>
  }
  return <>{children}</>
}

export default PrivateRoute
