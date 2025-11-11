const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { cpuUsage } = require('process');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to XAMPP MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',   // use IPv4 localhost (not ::1)
  user: 'root',        // default XAMPP MySQL user
  password: '',        // default XAMPP MySQL password is empty
  database: 'testdb'   // the database you created
});

// Verify connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('✅ Connected to XAMPP MySQL!');
  }
});


// --------- Get statements --------- //

// Get all jobs.
app.get('api/service', (req, res) => {
	db.query('SELECT * FROM "School Service"', (err, rows) => {
		if (err) return res.status(500).json({error: err});
		res.json(rows);
	});
});


// Get all jobs of given type.
app.get('api/service/:type', (req, res) => {
    const {type} = req.params.type;
	db.query('SELECT * FROM "School Service" WHERE "Type of Service" = (type)', [type], (err, rows) => {
		if (err) return res.status(500).json({error: err});
		res.json(rows);
	});
});


// Get all users.
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM "user login table"', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});


// Get user info by id.
app.get('/api/user/:id', (req, res) => {
  const {id} = req.params.id;
  db.query('SELECT * FROM "user login table" WHERE UID = (id)', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});




// --------- Put statements --------- //

// Update user attributes.
app.put('api/put/user/:id', (req, res) => {
  const { uid } = req.params.id;
  const {
    first_name,
    last_name,
    email,
    phone,
    school_id,
    dorm,
    room,
    role
  } = req.body;

    const db_query = `INSERT INTO \`user login table\` 
    (\`First Name\`, \`Last Name\`, Email, \`Phone Number\`, UID, 
    \`School ID\`, Dorm, Room, Role, Hash) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Check for null values.
    if (!uid || !first_name || !email || !phone) {
      return res.status(400).json({
        error: 'Missing one or more required fields: UID, First Name, Email, Phone Number'
    });
    }

    // Generate random UID.
    max = 4095;
    min = 0;
    uid = Math.floor(Math.random() * (max - min + 1)) + min;

    const values = [
      first_name,
      last_name,
      email,
      phone,
      uid,
      school_id,
      dorm,
      room,
      role,
      hash
    ]


    db.query(db_query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Database update failed",
          details: err.message });
      }
      res.status(200).json({
        message: "User updated inserted successfully."
      });
    });
});

// Update request information.
app.put('api/put/service/:sno', (req, res) => {
  const { sno } = req.params.sno;
  const { uid, service_type, service_date, deadline, cond, notes } = req.body;
  db.query('UPDATE requests SET UID=(uid), "Type of Service" = (service_type), "Service Date"=(service_date), Condition=(cond), Notes=(notes), Dates=(dates) WHERE SNO=(sno)',
    [uid, service_type, service_date, deadline, cond, notes, sno, dates], (err, rows) => {
      if (err) return res.status(500).json({error:err});
    });
});



// --------- Post statements --------- //

// Insert a new request.
app.post('api/insert/service', (req, res) => {

    const current_date = sqlDate();
    const {
      uid,
      sno,
      service_type,
      request_date = current_date,
      service_date,
      deadline_date = null,
      condition = 0,
      preferred_times = null,
      notes,
    } = req.body;

    const db_query = `INSERT INTO \`School Service\` 
    (SID, SNO, UID, \`Type of Service\`, \`Request Date\`, \`Service Date\`, \`Deadline Date\`, Condition, \`Preferred Times\`, Notes) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Check for null values.
    if (!uid || !sno || !service_type || !service_date) {
      return res.status(400).json({
        error: 'Missing one or more required fields: UID, SNO, Type of Service, Service Date'
    });
    }

    // Generate random SID.
    max = 1023;
    min = 0;
    sid = Math.floor(Math.random() * (max - min + 1)) + min;

    const values = [
      sid,
      sno,
      uid,
      service_type,
      request_date = current_date,
      service_date,
      deadline_date,
      condition,
      preferred_times,
      notes
    ]

    db.query(db_query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Database insertion failed",
          details: err.message });
      }
      res.status(201).json({
        message: "Service request inserted successfully.",
        SID: sid,
        SNO: sno,
        insertID: result.insertID
      });
    });
});

// Insert a new user.
app.post('/api/insert/user', async (req, res) => {
  const { firstname, lastname, password, email, phone, school_id, dorm, room, role } = req.body;
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const query = 
    `INSERT INTO \`user login table\` 
    (\`First Name\`, \`Last Name\`, \`Email\`, \`Phone Number\`, \`School ID\`, \`Dorm\`, \`Room\`, \`Role\`, \`Hash\`) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [firstname, lastname, email, phone, school_id, dorm, room, role, hash], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ success: true, userId: uid });
    });
  } catch (err) {
    res.status(500).json({ error: 'Hashing failed', details: err });
  }
});

// Get current date in SQL DATE format.
function sqlDate(){
  const currentDate = Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toString(currentDate.getMonth() + 1).padStart(2, '0');
  const day = currentDate.toString(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = '${year}-${month}-${day}';
  return formattedDate;
}

app.listen(5000, () => console.log('Server running on port 5000'));
