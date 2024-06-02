import { useNavigate } from 'react-router-dom'
import useUserStore from '../../Store/store'
import { useEffect } from 'react'

const PrivateRoute = ({ children, isOperator = false }) => {
  const navigate = useNavigate()
  const userDetails = useUserStore((state) => state.userDetails)
  useEffect(() => {
    if (isOperator) {
      if (!userDetails.data.company_name) {
        navigate('/operator/login')
      }
      return
    }
    if (
      !userDetails.data.name &&
      !userDetails.data.email &&
      !userDetails.loading
    ) {
      navigate('/login')
    }
  }, [userDetails, navigate, isOperator])
  if (userDetails.loading) {
    return <div>Loading....</div>
  }
  return <>{children}</>
}

export default PrivateRoute
