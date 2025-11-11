const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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
  const { username, email, phone, school_id, dorm, room } = req.body;
  db.query('UPDATE "user login table" SET Username = (username), Email = (email), "Phone Number" = (phone), "School ID"=(school_id), Dorm=(dorm), Room=(room) WHERE uid = (uid)',
     [username, email, phone, school_id, dorm, room, uid], (err, rows) =>{
    if (err) return res.status(500).json({error: err});
  });
});

// Update request information.
app.put('api/put/service/:sno', (req, res) => {
  const { sno } = req.params.sno;
  const { uid, service_type, service_date, deadline, cond, notes } = req.body;
  db.query('UPDATE requests SET UID=(uid), "Type of Service" = (service_type), "Service Date"=(service_date), Condition=(cond), Notes=(notes) WHERE SNO=(sno)',
    [uid, service_type, service_date, deadline, cond, notes, sno], (err, rows) => {
      if (err) return res.status(500).json({error:err});
    });
});



// --------- Post statements --------- //

// Insert a new request.
app.post('api/insert/service', (req, res) => {
    const { uid, service_type, req_date, service_date, deadline, cond, notes } = req.body;
    db.query('INSERT INTO requests VALUES ((uid),(dorm),(room),(service_type),(datereq),(stype),(status),(cond),(notes))', 
        [uid, service_type, req_date, service_date, deadline, cond, notes], (err, rows) =>{
            if (err) return res.status(500).json({error: err});
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

app.listen(5000, () => console.log('Server running on port 5000'));
