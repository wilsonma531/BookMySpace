import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function UserNextButton(){

  const navigate = useNavigate(); 

  const nextPage = () => {
    navigate('/UserRoomBooking.jsx');
  };

  return (
    <div>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
export default UserNextButton;
