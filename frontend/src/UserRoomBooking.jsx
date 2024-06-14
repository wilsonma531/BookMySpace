import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserRoomBooking({ setSelectedRoom, setAttendees, greatestTesterRequired }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [attendees, setAttendeesLocal] = useState(1);
  const [selectedRoomCapacity, setSelectedRoomCapacity] = useState(null);

  useEffect(() => {
    // Fetch rooms data from the server
    axios.get('http://localhost:7001/api/room')
      .then(response => {
        console.log('Fetched rooms:', response.data); // Debug log
        setRooms(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rooms!', error); // Debug log
      });
  }, []);

  const handleRoomChange = (e) => {
    const roomId = parseInt(e.target.value);
    setSelectedRoomId(roomId);
    const selectedRoom = rooms.find(room => room.id === roomId);
    console.log('Selected room:', selectedRoom); // Debug log
    setSelectedRoom(selectedRoom);
    setSelectedRoomCapacity(selectedRoom ? selectedRoom.capacity : null);
  };

  const handleAttendeesChange = (e) => {
    const attendeesCount = parseInt(e.target.value);
    setAttendeesLocal(attendeesCount);
    setAttendees(attendeesCount);
  };

  return (
    <div>
      <div>
        <label htmlFor="room">Room: </label>
        <select id="room" onChange={handleRoomChange} value={selectedRoomId}>
          <option value="" disabled>Select a room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      {selectedRoomCapacity !== null && (
        <div>
          <p>Capacity: {greatestTesterRequired} / {selectedRoomCapacity}</p>
        </div>
      )}
      <div>
        <label htmlFor="attendees">Attendees: </label>
        <select id="attendees" onChange={handleAttendeesChange} value={attendees}>
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserRoomBooking;
