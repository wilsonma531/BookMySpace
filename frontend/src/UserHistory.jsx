import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingDate from './UserBookingDate';
import BookingMonth from './UserBookingMonth';
import BookingWeek from './UserBookingWeek';
import BookingNumber from './UserBookingNumber';
import BookingStatus from './UserBookingStatus';
import BookingEquipment from './UserBookingEquipment';
import BookingTester from './UserBookingTester';
import BookingTeam from './UserBookingTeam';
//import './App.css';
import './App.css';  // Import the CSS file

function UserHistory() {
  const [reservations, setReservations] = useState([]);
  const teamId = localStorage.getItem('teamId');
  const [visibleDetails, setVisibleDetails] = useState({});

  useEffect(() => {
    // Fetch reservations data from the backend
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:7001/api/reservations/'+teamId); // Assuming this endpoint returns all reservations
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

  return (
    <div>
      <div style={{left: 43, top: 82, position: 'fixed', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>history</div>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id} className={`reservation-card`}>
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
                <td> </td>
                <td>
                <div style={{color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                  #
                </div>
                </td>
                <td>
                <div style={{textAlign: 'left', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
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
                <td> </td>
                <td>
                <div style={{color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                  STATUS:
                </div>
                </td>
                <td>
                <div style={{color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
                <BookingStatus bookingStatus={reservation.checked_in} />
                </div>
                </td>
              </tr>
            </table>

            {visibleDetails[reservation.id] && (
              <>
                <table>
                  <tr>
                    <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    Total Equipment:
                    </div>
                  </tr>
                  <tr>
                    <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    <BookingEquipment bookingEquipment={reservation.equipments_booked} />
                    </div>
                  </tr>
                  <tr>
                    <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    Total Attendees:
                    </div>
                  </tr>
                  <tr>
                  <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    <BookingTester bookingTester={reservation.attendees} />
                    </div>
                  </tr>
                  <tr>
                  <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    Tester:
                    </div>
                  </tr>
                  <tr>
                  <div style={{width: '100%', height: '100%', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word'}}>
                    <BookingTeam bookingTeam={reservation.teamName} />
                    </div>
                  </tr>
                </table>
              </>
            )}
            <button
             onClick={() => toggleDetails(reservation.id)}>
              {visibleDetails[reservation.id] ? 'Close' : 'Details'}
            </button>
            
            {/* <BookingEquipment bookingEquipment={reservation.equipments_booked} />
            <BookingTester bookingTester={reservation.attendees} />
            <BookingTeam bookingTeam={reservation.teamName} /> 
            <Link to={`/history/${reservation.id}`}>
              <button>Details</button>
            </Link>*/}
          </div>
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
}

export default UserHistory;