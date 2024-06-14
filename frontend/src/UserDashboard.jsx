import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BookingDate from './UserBookingDate';
import BookingMonth from './UserBookingMonth';
import BookingWeek from './UserBookingWeek';
import BookingStatus from './UserBookingStatus';
import BookingEquipment from './UserBookingEquipment';
import BookingNumber from './UserBookingNumber';
import BookingTeam from './UserBookingTeam';
import BookingRoom from './UserBookingRoom';
import './App.css';
//import './UserDashboard.css';  // Import the CSS file

function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const teamId = localStorage.getItem('teamId');
  const [visibleDetails, setVisibleDetails] = useState({});
  const [checkInMessage, setCheckInMessage] = useState('');

  useEffect(() => {
    // Fetch reservations data from the backend
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:7001/api/dashboard/${teamId}`); // Assuming this endpoint returns all reservations
        const data = await response.json();
        setReservations(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [teamId]);

  const toggleDetails = (id) => {
    setVisibleDetails(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleCheckIn = async (id) => {
    try {
      const response = await fetch(`http://localhost:7001/api/reservations/checkin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        // Filter out the checked-in reservation from the state
        setReservations(prevReservations =>
          prevReservations.filter(reservation => reservation.id !== id)
        );
        console.log(result.message);
        setCheckInMessage('Thank you, your check-in time has been successfully logged.');
        // Remove the message after a few seconds
        setTimeout(() => {
          setCheckInMessage('');
        }, 3000);
      } else {
        console.error('Check-in failed:', result.error);
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  return (
    <div>
      <div style={{left: 43, top: 82, position: 'fixed', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>Dashboard</div>
      {checkInMessage && <p className="check-in-message">{checkInMessage}</p>}
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id} className="dashboard-card">
            <table>
              <tr>
                <td>
                <div style={{color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingDate bookingDate={reservation.bookingDate} />
                </div>
                </td>
                <td>
                <div style={{color: '#FF0000', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingMonth bookingMonth={reservation.bookingMonth} />
                </div>
                </td>
                <td>
                <div style={{textAlign: 'right', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                <BookingNumber bookingNumber={reservation.id} />
                </div>  
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingWeek bookingWeek={reservation.bookingWeek} />
                </div>
                </td>
                <td>
                <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingTeam bookingTeam={reservation.teamName} />
                </div>
                </td>
                <td>
                <div style={{width: '100%', height: '100%', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingRoom bookingRoom={reservation.roomName} />
                </div>
                </td>
              </tr>
            </table>

            {visibleDetails[reservation.id] && (
              <>
                <table>
                  <tr>
                    <td>
                    <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                      Tested Equipment:
                    </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div style={{width: '100%', height: '100%', textAlign: 'left', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                      <BookingEquipment bookingEquipment={reservation.equipments_booked} />
                    </div>  
                    </td>
                  </tr>
                </table>
                <Link to="/reservation">Modify</Link> {/* Use Link to navigate to UserReservation */}
                <button onClick={() => handleCheckIn(reservation.id)}>
                  Check-In
                </button>
              </>
            )}
            <button onClick={() => toggleDetails(reservation.id)}>
              {visibleDetails[reservation.id] ? 'Close' : 'Details'}
            </button>
          </div>
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
}

export default UserDashboard;
