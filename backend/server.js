const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 7001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Change to your user password 
    database: 'bookmyspace' // Change to your database name
});

// Connect to MySQL database
con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware to parse request body
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'Public')));

// Route to serve the login HTML page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.jsx'));
});

// Route to handle login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT id, first_name, last_name, email, team_id, created_at FROM user WHERE email = ? AND password = ?';
    con.query(query, [email, password], (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        res.status(500).json({ success: false, message: 'An internal server error occurred' });
      } else if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.json({ success: false, message: 'Invalid email or password' });
      }
    });
  });

// Route to update the checked_in status for a reservation
app.put('/api/reservations/checkin/:id', (req, res) => {
    const reservationId = req.params.id;
    console.log(`CHECKING IN RESERVATION ID: ${reservationId}`);

    const query = `UPDATE reservation SET checked_in = 1 WHERE id = ?`;
    //const query = `UPDATE reservation SET checked_in = 1 WHERE id = ?`;
    con.query(query, [reservationId], (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred', details: error });
            return;
        }

        if (results.affectedRows > 0) {
            console.log('Check-in successful for reservation ID:', reservationId);
            res.json({ success: true, message: 'Check-in successful' });
            const cap = `UPDATE room JOIN reservation ON room.id = reservation.room_id SET room.capacity = room.capacity + reservation.attendees WHERE reservation.id = ?`;
            con.query(cap, [reservationId], (error, results)=>{
                if (error) {
                    console.error('Error:', error);
                    res.status(500).json({ error: 'An internal server error occurred', details: error });
                    return;
                }
            }) 
        } else {
            console.log('No reservation found with ID:', reservationId);
            res.status(404).json({ error: 'No reservation found' });
        }
    });
});


// Route to retrieve reservations for teamId (Dashboard Page)
app.get('/api/dashboard/:teamid', (req, res) => {
    const teamId = req.params.teamid;
    console.log("GETTING ALL RESERVATIONS...");
    console.log('Received request for /api/reservations/');

    const query = `SELECT r.id, 
                          DATE_FORMAT(booking_date, "%d") AS bookingDate,
                          DATE_FORMAT(booking_date, "%b") AS bookingMonth,
                          DATE_FORMAT(booking_date, "%W") AS bookingWeek,
                          equipments_booked, 
                          checked_in, 
                          r.room_id,
                          r.team_id,  
                          rm.name as roomName, 
                          t.name as teamName 
                   FROM reservation as r 
                   LEFT JOIN team as t ON t.id = r.team_id 
                   LEFT JOIN room as rm ON rm.id = r.room_id 
                   WHERE t.id = ?
                   AND r.checked_in = 0
                   ORDER BY booking_date DESC`;
    con.query(query, [teamId], (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred', details: error });
            return;
        }

        if (results.length > 0) {
            const reservation = results;
            console.log('Sending response:', reservation);
            res.json(reservation);
        } else {
            console.log('No reservations found');
            res.status(404).json({ error: 'No reservations found' });
        }
    });
});


// Route to retrieve reservations for teamId (History Page)
app.get('/api/reservations/:teamid', (req, res) => {
    const teamId = req.params.teamid;
    console.log("GETTING ALL RESERVATIONS...");
    console.log('Received request for /api/reservations/');

    const query = `SELECT r.id, DATE_FORMAT(booking_date, "%d") AS bookingDate, DATE_FORMAT(booking_date, "%b") AS bookingMonth, DATE_FORMAT(booking_date, "%W") AS bookingWeek, equipments_booked, checked_in, attendees,team_id, t.name as teamName 
                   FROM reservation as r 
                   LEFT JOIN team as t ON t.id = team_id 
                   WHERE t.id = ?
                   ORDER BY booking_date DESC`;
    con.query(query, [teamId], (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred', details: error });
            return;
        }

        if (results.length > 0) {
            const reservation = results;
            console.log('Sending response:', reservation);
            res.json(reservation);
        } else {
            console.log('No reservations found');
            res.status(404).json({ error: 'No reservations found' });
        }
    });
});

// Route to retrieve reservation by ID
app.get('/api/reservation/:reservationId', (req, res) => {
    const id = req.params.reservationId;
    console.log('Received request for /api/reservation/' + id);

    const query = `SELECT r.id, DATE_FORMAT(booking_date, "%W, %d-%M") AS booking_date, equipments_booked, checked_in, attendees,team_id, t.name as teamName 
                   FROM reservation as r 
                   LEFT JOIN team as t ON t.id = team_id 
                   WHERE r.id = ?`;
    con.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred', details: error });
            return;
        }

        if (results.length > 0) {
            const reservation = results[0];
            console.log('Sending response:', reservation);
            res.json(reservation);
        } else {
            console.log('No reservations found');
            res.status(404).json({ error: 'No reservations found' });
        }
    });
});


// Route to retrieve equipment data
app.get('/api/equipment', (req, res) => {
    const query = 'SELECT * FROM equipment';
    con.query(query, (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
            return;
        }

        res.json(results);
        
    });
});

// Route to retrieve room data
app.get('/api/room', (req, res) => {
    const query = 'SELECT * FROM room';
    con.query(query, (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
            return;
        }

        res.json(results);
        
    });
});

// New endpoint to ADD/handle reservation creation
app.post('/api/reservation', (req, res) => {
    const { equipments_booked, booking_date, attendees, room_id, team_id } = req.body;
    console.log(req.body);
 
const originalDate = booking_date;
 
// Create a new Date object from the original date string
const dateObj = new Date(originalDate);
 
// Get the date components
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(dateObj.getDate()).padStart(2, '0');
 
// Get the time components
const hours = String(dateObj.getHours()).padStart(2, '0');
const minutes = String(dateObj.getMinutes()).padStart(2, '0');
const seconds = String(dateObj.getSeconds()).padStart(2, '0');
 
// Combine the components into the desired format
const bookingDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 
    if (!equipments_booked || !bookingDate || !attendees || !room_id || !team_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
 
    con.query('SELECT capacity FROM room WHERE id = ?', [room_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'An internal server error occurred' });
            return;
        }
 
        if (results.length === 0) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }
 
        const roomCapacity = results[0].capacity;
        if (attendees > roomCapacity) {
            res.status(400).json({ error: 'Number of attendees exceeds room capacity' });
            return;
        }
 
        const query = 'INSERT INTO reservation (equipments_booked, team_id, room_id, booking_date, checked_in, attendees) VALUES (?, ?, ?, ?, 0, ?)';
        con.query(query, [equipments_booked, team_id, room_id, bookingDate, attendees], (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'An internal server error occurred' });
            } else {
                const newCapacity = roomCapacity - attendees;
                con.query('UPDATE room SET capacity = ? WHERE id = ?', [newCapacity, room_id], (err, updateResults) => {
                    if (err) {
                        console.error('Database query error:', err);
                        res.status(500).json({ error: 'An internal server error occurred' });
                    } else {
                        res.status(201).json({ message: 'Reservation created successfully', reservationId: results.insertId });
                    }
                });
            }
        });
    });
});
 
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
