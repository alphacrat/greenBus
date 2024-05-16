import '../styles/App.css';
import Header from '../components/User/header/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusSearch from '../components/User/bus_search/BusSearch.jsx';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BusLayout from '../components/User/bus_layout/BusLayout.jsx';
import BusBookForm from '../components/User/bus_booking_form/BusBookForm.jsx';
import UserLogin from '../components/User/user_login/UserLogin.jsx';
import SignupPage from '../components/User/user_login/UserSignup.jsx';
import BusOperatorLoginPage from '../components/bus_operators/login/BusOperatorLoginPage.jsx';
import BusOperatorSignupPage from '../components/bus_operators/login/BusOperatorSignUpPage.jsx';
import OperatorDashboard from '../components/bus_operators/Dashboard/OperatorDashboard.jsx';
import AddBus from '../components/bus_operators/add_bus/AddBus.jsx';
import BusOperations from '../components/bus_operators/Dashboard/BusOperations.jsx';

function App() {
  // State for search parameters
  const [searchState, setSearchState] = useState({
    from: '',
    to: '',
    date: '',
  });

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // State for selected date
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<BusSearch searchState={searchState} setSearchState={setSearchState} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
          />

          <Route
            path="/bus/:id"
            element={<BusLayout selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} selectedDate={selectedDate} />}
          />

          <Route
            path="/login"
            element={<UserLogin />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/bus/book"
            element={<BusBookForm selectedSeats={selectedSeats} searchState={searchState} setSelectedSeats={setSelectedSeats} setSearchState={setSearchState} />}
          />

          <Route
            path="/operator/login"
            element={<BusOperatorLoginPage />}
          />

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

          <Route
            path="/operator/dashboard/:name/add"
            element={<AddBus />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
