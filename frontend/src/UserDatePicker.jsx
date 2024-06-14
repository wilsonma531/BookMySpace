import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UserDatePicker({ setSelectedDate }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat='dd/MM/yyyy'
      />
    </div>
  );
}

export default UserDatePicker;
