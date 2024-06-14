import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomDatePicker from './UserDatePicker';
import EquipmentPicker from './UserEquipmentPicker';
import TotalEquipAndTester from './UserTotalEquipAndTester';
import UserRoomBooking from './UserRoomBooking';
import './App.css';

function UserReservation() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEquipmentNames, setSelectedEquipmentNames] = useState('');
  const [greatestTesterRequired, setGreatestTesterRequired] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [attendees, setAttendees] = useState(1);
  const [message, setMessage] = useState('');

  const teamId = localStorage.getItem('teamId');

  useEffect(() => {
    if (id) {
      // Fetch existing reservation details to prefill the form
      const fetchReservationDetails = async () => {
        try {
          const response = await fetch(`http://localhost:7001/api/reservation/${id}`);
          const data = await response.json();
          // Populate state with fetched data
          setSelectedDate(new Date(data.booking_date));
          setSelectedEquipmentNames(data.equipments_booked);
          setGreatestTesterRequired(data.greatestTesterRequired);
          setSelectedRoom(data.room_id); // Adjust this as per your data structure
          setAttendees(data.attendees);
        } catch (error) {
          console.error('Error fetching reservation details:', error);
        }
      };

      fetchReservationDetails();
    }
  }, [id]);

  const handleBooking = () => {
    const reservation = {
      equipments_booked: selectedEquipmentNames,
      booking_date: selectedDate,
      attendees: parseInt(attendees),
      room_id: selectedRoom ? selectedRoom.id : null,
      team_id: teamId,
    };

    fetch('http://localhost:7001/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error || 'Network response was not ok') });
      }
      return response.json();
    })
    .then(data => {
      alert('Thank you, the reservation has been sent to your team.');
      // setMessage('Thank you, the reservation has been sent to your team.');
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('There was an error making the reservation. Please try again.');
      // setMessage('There was an error making the reservation. Please try again.');
    });
  };

  return (
    <div>
      <div style={{left: 43, top: 82, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>Reservation</div>
      <div className='booking-card'>
      <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>
      Equipment Reservation
      </div>
      <td>
      <div style={{width: '100%', height: '100%', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
        Date:
      </div>
      </td>
      <td>
      <CustomDatePicker setSelectedDate={setSelectedDate} />
      </td>
      <div style={{width: '100%', height: '100%', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
      <EquipmentPicker 
        setSelectedEquipmentNames={setSelectedEquipmentNames} 
        setGreatestTesterRequired={setGreatestTesterRequired}
      />
      </div>
      <br/>
      <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>
        Room Reservation
      </div>
      <div style={{width: '100%', height: '100%', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word'}}>
      <UserRoomBooking 
        setSelectedRoom={setSelectedRoom} 
        setAttendees={setAttendees}
        greatestTesterRequired={greatestTesterRequired}
      />
      <TotalEquipAndTester 
        selectedDate={selectedDate}
        selectedEquipmentNames={selectedEquipmentNames} 
        greatestTesterRequired={greatestTesterRequired} 
      />
      </div>
      <button onClick={handleBooking}>Book Now</button>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default UserReservation;