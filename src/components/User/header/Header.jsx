import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, Link, useParams } from 'react-router-dom'
import image from '../../../assets/logo.png'
import '../../../styles/App.css'

const HeaderContainer = styled.header`
  background-color: #436850;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 20px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  // background-color:red;
`

const HeaderTitle = styled.h1`
  color: #fbfada;
  font-size: 2rem;
  margin: 0;
`

const LogoImage = styled.img`
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;
`

const Header = () => {
  const location = useLocation()
  const { name } = useParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isRootRoute = location.pathname === '/'
  const isOperatorDashboard = location.pathname.startsWith(
    '/operator/dashboard'
  )
  const companyName = isOperatorDashboard
    ? decodeURIComponent(location.pathname.split('/')[3])
    : null

  const handleLoginClick = () => {
    if (isRootRoute && !isLoggedIn) {
      window.location.href = '/login'
    }
  }

  const handleJoinClick = () => {
    if (isRootRoute && !isLoggedIn) {
      window.location.href = '/operator/login'
    }
  }

  const handleOnPressAdd = () => {
    // Handle the logic when the Add button is clicked
    // For example, navigate to the Add Bus page
    window.location.href = `/operator/dashboard/${companyName}/add`
  }

  return (
    <div className="header-main-container">
      <HeaderContainer>
        <LogoContainer>
          <LogoImage src={image} alt="Bus Logo" />
          <HeaderTitle>
            {isOperatorDashboard ? companyName : 'greenBus'}
          </HeaderTitle>
        </LogoContainer>
        <ButtonContainer>
          {isRootRoute && !isLoggedIn && (
            <Button onClick={handleJoinClick}>
              <FontAwesomeIcon icon={faBus} size="xl" color="#FBFADA" />
            </Button>
          )}
          {isRootRoute && !isLoggedIn && (
            <Button onClick={handleLoginClick}>
              <FontAwesomeIcon icon={faUser} size="xl" color="#FBFADA" />
            </Button>
          )}
        </ButtonContainer>

        {isOperatorDashboard && (
          <RightButtonContainer>
            <Button onClick={handleOnPressAdd}>
              <FontAwesomeIcon icon={faPlus} size="xl" />
            </Button>
          </RightButtonContainer>
        )}
      </HeaderContainer>
    </div>
  )
}

export default Header
