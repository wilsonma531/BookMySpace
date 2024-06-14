import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({email, password});
    try {
      const response = await axios.post('http://localhost:7001/api/login', { email, password });
      const { success, user, message } = response.data;
      if (success) {
        console.log('LOGIN SUCCESS');
        console.log(response.data);
        console.log(user.team_id);
        //console.log(localStorage.getItem('user'));
        // Handle successful login (e.g., set user data in local storage)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('teamId', JSON.stringify(user.team_id));
        // const storedUser = JSON.parse(localStorage.getItem('user'));
        // console.log('StoredUser');
        // console.log(storedUser);

        onLogin(); // Call the onLogin function passed as a prop
        navigate('/');
      } else {
        console.log('LOGIN FAILED');
        setError(message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Login error:', error);
    }

    // try {
    //   const response = await axios.post('http://localhost:7001/api/login', { email, password });
    //   const userData = response.data;

    //   // Handle authentication success
    //   console.log('User data:', userData);
    // } catch (error) {
    //   console.error('Login failed:', error.response.data.error);
    //   setError(error.response.data.error);
    // }
  };

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
      <div style={{left: 60, top: 280, position: 'absolute', color: 'black', fontSize: 44, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word'}}>
        BookMySpace
      </div>
        <div style={{width: 340, height: 155, left: 44, top: 360, position: 'absolute', background: '#EDEDED', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15}}>
          <form onSubmit={handleSubmit}>
            <div style={{left: 20, top: 30, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word'}}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{left: 145, position: 'absolute'}}/>
            </div>
            <div style={{left: 20, top: 70, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word'}}>
            <label>
                    Password:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required style={{left: 145, position: 'absolute'}}
                    />
                    <div style={{left: 0, top: 30, position: 'absolute'}}>
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                    </div>
                </label>
              
            </div>
            <button type="submit" style={{left: 225, top: 100, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word', width: '30%', height: '18%', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10}}>Login</button>
            {error && <div>{error}</div>}
          </form>
        </div>  
    </div>
  );
}

export default Login;