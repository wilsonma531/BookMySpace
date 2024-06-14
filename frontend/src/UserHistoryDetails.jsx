import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserHistoryDetails() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  console.log("ON PAGE HISTORY DETIALS....");

  useEffect(() => {
    // Fetch the reservation details based on the ID
    const fetchReservationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7001/api/reservation/${id}`);
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
    };

    fetchReservationDetails();
  }, [id]);

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-card">
      <h1>Reservation Details</h1>
      <p>Booking Date: {reservation.booking_date}</p>
      <p>Booking Number: {reservation.id}</p>
      <p>Booking Status: {reservation.checked_in ? 'Checked In' : 'Not Checked In'}</p>
      <p>Booking Equipment: {reservation.equipments_booked}</p>
      <p>Booking Tester: {reservation.attendees}</p>
      <p>Booking Team: {reservation.teamName}</p>
    </div>
  );
}

export default UserHistoryDetails;