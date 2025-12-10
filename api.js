const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { cpuUsage } = require('process');
const { useId } = require('react');

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
  };
});


// --------- Get statements --------- //


app.get('/api/student/has-fridge', (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ has_fridge: false });
  }

  db.query(
    'SELECT 1 FROM `Fridge_Tracker` WHERE `Owner` = ? LIMIT 1',
    [uid],
    (err, rows) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ has_fridge: false });
      }
      const hasFridge = rows.length > 0;
      res.json({ has_fridge: hasFridge });
    }
  );
});


// Get all jobs.
app.get('/api/service', (req, res) => {
	db.query('SELECT * FROM \`Service\`', (err, rows) => {
		if (err) return res.status(500).json({error: err});
		res.json(rows);
	});
});


// Get all jobs of given type.
app.get('/api/service/:type', (req, res) => {
    const {type} = req.params;
	db.query('SELECT * FROM \`Service\` WHERE \`Type of Service\` = (type)', [type], (err, rows) => {
		if (err) return res.status(500).json({error: err});
		res.json(rows);
	});
});


app.get('/api/fridge_tracker/owner/:uid', (req, res) => {
  const { uid } = req.params;

  if (!uid) return res.status(400).json({ error: 'UID is required' });

  db.query(
    `SELECT FID, Owner, Location, Room, Status, Moved 
     FROM \`Fridge_Tracker\` 
     WHERE Owner = ? 
     ORDER BY Moved DESC 
     LIMIT 1`,
    [uid],
    (err, rows) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows[0] || null);
    }
  );
});

// Get all users.
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM \`Login\`', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});


// Get user info by id.
app.get('/api/user/:id', (req, res) => {
  const {id} = req.params;
    console.log("Getting user: " + id);
  db.query('SELECT * FROM \`Login\` WHERE UID = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// Get all workers
app.get('/api/users/workers', (req, res) => {
  db.query('SELECT * FROM \`Login\` WHERE ROLE = "Worker"', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});


// Get user info by login information.
app.get('/api/user/:email/:pass', (req, res) => {
  const { email, pass } = req.params;

  db.query('SELECT * FROM `Login` WHERE `Email` = ?', [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = rows[0];

    try {
      const match = await bcrypt.compare(pass, user.Hash); // compare plain password to stored hash
      if (match) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Password comparison failed', details: err });
    }
  });
});




// --------- Put statements --------- //

// Update user attributes.
app.put('/api/put/user/:uid', (req, res) => {
  const { uid } = req.params;
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

  const db_query = `
    UPDATE \`Login\`
    SET 
    \`First Name\` = ?, \`Last Name\` = ?, \`Email\` = ?, \`Phone Number\` = ?, \`School ID\` = ?,
    \`Dorm\` = ?, \`Room\` = ?, \`Role\` = ?, \`Hash\` = ?
    WHERE UID = ?
  `;
    // Check for null values.
  if (!uid) {
    return res.status(400).json({
        error: 'Missing user ID!'
    });
  };

  const values = [
    first_name,
    last_name,
    email,
    phone,
    school_id,
    dorm,
    room,
    role,
    hash,
    uid
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
app.put('/api/put/service/:sid', (req, res) => {
  const { sid } = req.params;
    const {
      sno,
      uid,
      service_type,
      request_date,
      service_date,
      deadline_date,
      condition,
      preferred_times,
      notes
    } = req.body;

  const db_query = `
    UPDATE \`Service\`
    SET 
    \`SNO\` = ?, \`UID\` = ?, \`Type of Service\` = ?, \`Request Date\` = ?,
    \`Service Date\` = ?, \`Deadline Date\` = ?, \`Condition\` = ?, \`Preferred Times\` = ?, \`Notes\` = ? 
    WHERE \`SID\` = ?
  `;
    // Check for null values.
  if (!sid) {
    return res.status(400).json({
        error: 'Missing service ID!'
    });
  };

  const values = [
    sno,
    uid,
    service_type,
    request_date,
    service_date,
    deadline_date,
    condition,
    preferred_times,
    notes,
    sid
  ]

  db.query(db_query, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database update failed",
        details: err.message });
    }
    res.status(200).json({
      message: "Request updated successfully."
    });
  });
});

// Change the status of a service request.
app.put('/api/service/:sid/:status', (req, res) => {
  const { sid, status } = req.params;
  console.log(sid + ' ' + status);
  if (!sid || !status) {
    return res.status(400).json({ error: 'Missing service ID or new status' });
  }

  const db_query = `
    UPDATE \`Service\`
    SET \`Status\` = ?
    WHERE \`SID\` = ?
  `;

  db.query(db_query, [status, sid], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.json({ message: 'Job marked as completed', sid });
  });
});

// Update request information.
app.put('/api/put/service/:sid', (req, res) => {
  const { sid } = req.params;
    const {
      sno,
      uid,
      service_type,
      request_date,
      service_date,
      deadline_date,
      condition,
      preferred_times,
      notes
    } = req.body;

  const db_query = `
    UPDATE \`Service\`
    SET 
    \`SNO\` = ?, \`UID\` = ?, \`Type of Service\` = ?, \`Request Date\` = ?,
    \`Service Date\` = ?, \`Deadline Date\` = ?, \`Condition\` = ?, \`Preferred Times\` = ?, \`Notes\` = ? 
    WHERE \`SID\` = ?
  `;
    // Check for null values.
  if (!sid) {
    return res.status(400).json({
        error: 'Missing service ID!'
    });
  };

  const values = [
    sno,
    uid,
    service_type,
    request_date,
    service_date,
    deadline_date,
    condition,
    preferred_times,
    notes,
    sid
  ]

  db.query(db_query, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database update failed",
        details: err.message });
    }
    res.status(200).json({
      message: "Request updated successfully."
    });
  });
});

// Change the condition of a service request.
app.put('/api/service/:sid/:condition', (req, res) => {
  const { sid, condition } = req.params;
  console.log(sid + ' ' + condition);
  if (!sid || !condition) {
    return res.status(400).json({ error: 'Missing service ID or new status' });
  }

  const db_query = `
    UPDATE \`Service\`
    SET \`Condition\` = ?
    WHERE \`SID\` = ?
  `;

  db.query(db_query, [condition, sid], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.json({ message: 'Job marked as completed', sid });
  });
});

// Change the WID of a service request.
app.put('/api/service/:sid/setwid/:wid', (req, res) => {
  const { sid, wid } = req.params;
  console.log(sid + ' ' + wid);
  if (!sid || !wid) {
    return res.status(400).json({ error: 'Missing service ID or WID' });
  }

  const db_query = `
    UPDATE \`Service\`
    SET \`WID\` = ?
    WHERE \`SID\` = ?
  `;

  db.query(db_query, [wid, sid], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found.' });
    }

    res.json({ message: "Job assigned to ${wid}.", wid });
  });
});

// Change the FID of a service request.
app.put('/api/service/:sid/setfid/:fid', (req, res) => {
  const { sid, fid } = req.params;
  console.log(sid + ' ' + fid);
  if (!sid || !fid) {
    return res.status(400).json({ error: 'Missing service ID or FID' });
  }

  const db_query = `
    UPDATE \`Service\`
    SET \`FID\` = ?
    WHERE \`SID\` = ?
  `;

  db.query(db_query, [wid, sid], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found.' });
    }

    res.json({ message: "Job assigned to ${wid}.", wid });
  });
});



// This is the one your WorkerDashboard actually calls
app.put('/api/update/fridge_tracker/fid/:fid', (req, res) => {
  const { fid } = req.params;
  const { Owner, School, Location, Room, Status } = req.body;

  if (!fid) {
    return res.status(400).json({ error: 'FID is required' });
  }

  const Moved = new Date().toISOString();

  const updates = [];
  const values = [];

  if (Owner !== undefined) { updates.push('`Owner` = ?'); values.push(Owner); }
  if (School !== undefined) { updates.push('`School` = ?'); values.push(School); }
  if (Location !== undefined) { updates.push('`Location` = ?'); values.push(Location); }
  if (Room !== undefined) { updates.push('`Room` = ?'); values.push(Room); }
  if (Status !== undefined) { updates.push('`Status` = ?'); values.push(Status); }

  updates.push('`Moved` = ?');
  values.push(Moved);
  values.push(fid);

  const query = `
    UPDATE \`Fridge_Tracker\`
    SET ${updates.join(', ')}
    WHERE \`FID\` = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Update fridge tracking failed:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      console.log("404 Fridge FID not found")
      return res.status(404).json({ error: 'Fridge FID not found' });
    }
    res.json({ message: 'Fridge tracking updated', FID: fid });
  });
});


function getUser(uid) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM `Login` WHERE UID = ?', [uid], (err, rows) => {
      if (err) return reject(err);
      resolve(rows[0] || null); // Return first row or null
    });
  });
}


// --------- Post statements --------- //

// Insert a new request.
// Insert a new request.
app.post('/api/insert/request', (req, res) => {
    const {
        uid,
        sno,
        service_type,
        request_date,
        service_date,
        deadline_date = null,
        condition = 0,
        preferred_times = null,
        notes,
        status = 'In Progress'
    } = req.body;

    console.log(req.body);

    // Validate required fields first
    if (!uid || !sno || !service_type ) {
        return res.status(400).json({
            error: 'Missing one or more required fields: UID, SNO, Type of Service'
        });
    }

    // Only check fridge ownership if not Delivery
    if (service_type !== "Delivery") {
        db.query(
            `SELECT 1 FROM \`Fridge_Tracker\` WHERE \`Owner\` = ? LIMIT 1`,
            [uid],
            (err, results) => {
                if (err) {
                    console.error("Database error during fridge check:", err);
                    return res.status(500).json({
                        error: "Error when checking fridge ownership.",
                        details: err.message
                    });
                }

                if (!results || results.length === 0) {
                    return res.status(404).json({
                        error: "User has no fridge to service.",
                        message: "You must have a fridge to request this service."
                    });
                }

                // The user has a fridge. Add request.
                completeRequestInsertion();
            }
        );
    } else {
        // For deliveries, the user does not need to have a fridge.
        completeRequestInsertion();
    }

    // Extract insertion logic to avoid duplication
    function completeRequestInsertion() {
        // Generate random SID (0–1023)
        const sid = Math.floor(Math.random() * 1024); // 0 to 1023

        const db_query = `
            INSERT INTO \`Service\`
            (\`SID\`, \`SNO\`, \`UID\`, \`Type of Service\`, \`Request Date\`, \`Service Date\`, 
             \`Deadline Date\`, \`Condition\`, \`Preferred Times\`, \`Notes\`, \`Status\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            sid,
            sno,
            uid,
            service_type,
            request_date,
            service_date,
            deadline_date,
            condition,
            preferred_times,
            notes,
            status
        ];

        db.query(db_query, values, (err, result) => {
            if (err) {
                console.error("Insertion error:", err);
                return res.status(500).json({
                    error: "Database insertion failed",
                    details: err.message
                });
            }

            res.status(201).json({
                message: "Service request inserted successfully.",
                SID: sid,
                SNO: sno,
                insertId: result.insertId
            });
        });
    }
});


// Insert a new user.
app.post('/api/insert/user', async (req, res) => {
  const { firstname, lastname, password, email, phone, school_id, dorm, room, role } = req.body;
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const query = 
    `INSERT INTO \`Login\` 
    (\`First Name\`, \`Last Name\`, \`Email\`, \`Phone Number\`, \`School ID\`, \`Dorm\`, \`Room\`, \`Role\`, \`Hash\`) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [firstname, lastname, email, phone, school_id, dorm, room, role, hash], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ success: true });
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
};

// Get all fridges
app.get('/api/fridges', (req, res) => {
  db.query('SELECT * FROM `Fridge_Tracker`', (err, rows) => {
    if (err) {
      console.error('Error fetching fridges:', err);
      return res.status(500).json({ error: err });
    }
    console.log(`Fetched ${rows.length} fridges`);
    res.json(rows);
  });
});

// Get fridges by school
app.get('/api/fridges/school/:school_id', (req, res) => {
  const { school_id } = req.params;
  
  db.query(
    'SELECT * FROM `Fridge_Tracker` WHERE `School` = ?',
    [school_id],
    (err, rows) => {
      if (err) {
        console.error('Error fetching fridges by school:', err);
        return res.status(500).json({ error: err });
      }
      console.log(`Fetched ${rows.length} fridges for school ${school_id}`);
      res.json(rows);
    }
  );
});

// Get fridge by ID
app.get('/api/fridge/:fid', (req, res) => {
  const { fid } = req.params;
  
  db.query(
    'SELECT * FROM `Fridge_Tracker` WHERE `FID` = ?',
    [fid],
    (err, rows) => {
      if (err) {
        console.error('Error fetching fridge:', err);
        return res.status(500).json({ error: err });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Fridge not found' });
      }
      res.json(rows[0]);
    }
  );
});
app.listen(5000, () => console.log('Server running on port 5000'));
