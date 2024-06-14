import React from 'react';

function UserBookingStatus({ bookingStatus }) {
  return <div>{bookingStatus ? 'Checked In' : 'Not Checked In'}</div>;
}

export default UserBookingStatus;
