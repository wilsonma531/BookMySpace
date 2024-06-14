import React from 'react';

function UserTotalEquipAndTester({ selectedDate, selectedEquipmentNames, greatestTesterRequired }) {
  // Format the date as "1 Jun 2024"
  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div>
       <hr />

      <p>Selected Date: {formattedDate}</p>
      <p>Total Selected Equipment: {selectedEquipmentNames || 'None'}</p>
      {greatestTesterRequired > 0 && (
        <p>Greatest Tester Required: {greatestTesterRequired}</p>
      )}
    </div>
  );
}

export default UserTotalEquipAndTester;
