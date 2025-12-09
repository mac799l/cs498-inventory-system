import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext, useMemo } from "react";

const UserContext = createContext();

//holds current user info
function UserProvider({ children }) {
const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
}); // user info will be stored here

useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user)) 
  }
  else {
    localStorage.removeItem('user');
  }
}, [user]);

return (
  <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>
);
}

// Home display
function Home() {
  const navigate = useNavigate();


  return (
    <div className="px-6 py-10 text-center sm:text-left sm:pl-12">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Home Menu</h1>
      <p className="text-gray-700 max-w-xl mx-auto sm:mx-0">
        Sign in or sign up below.
      </p>
      <br />
      <button
        className="px-6 py-2 text-blue-800 font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 transition"
        onClick={() => navigate("/signin")}
      >
        Sign In
      </button>
      <br />
      <br />
      <Link to="/signup">
      <button
        className="px-6 py-2 text-blue-800 font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      </Link>
    </div>
  );
}

function Signup({ color, description } ) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [schoolID, setSchoolID] = useState(null);
  const [dorm, setDorm] = useState(null);
  const [roomnum, setRoomNum] = useState(null);
 
  async function handleSubmission(event) {
    event.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      password: password, //used for hash
      email: email,
      phone: phone,
      role: role,
      school_id : schoolID,
      dorm: dorm,
      room: roomnum
    }
 
    await fetch("http://localhost:5000/api/insert/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => alert("User created successfully! Return to home to sign in"))
      .then(() => {  setRole("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setEmail("");
        setPhone("");
        setSchoolID("");
        setDorm("");
      setRoomNum(""); })
      .catch((error) => console.error("Error:", error));
  }
 
  const colorMap = {
    blue: {
      text: "text-blue-700",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    green: {
      text: "text-green-700",
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
    },
    purple: {
      text: "text-purple-700",
      bg: "bg-purple-600",
      hover: "hover:bg-purple-700",
    },
    amber: {
      text: "text-amber-700",
      bg: "bg-amber-600",
      hover: "hover:bg-amber-700",
    },
  };
 
const c = colorMap[color] || colorMap.blue;
 
return (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
  <div className="px-6 py-10 sm:pl-12">
    <h2 className={`text-3xl font-bold ${c.text} mb-4`}>Sign Up</h2>
    <p className="text-gray-600 max-w-2xl mb-4">{description}</p>

    <form>
 
    <label className="block mb-2 font-medium">Select your role:</label>
    <select
      value={role}
      onChange={(e) => { setRole(e.target.value)
        if (e.target.value !== "Student") {
          setSchoolID("");
          setDorm("");
          setRoomNum("");
        }
      }}
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select role</option>
      <option value="Student">Student</option>
      <option value="Worker">Worker</option>
      <option value="Liaison">Company Liaison</option>
      <option value="Campus Housing">Campus Housing</option>
    </select>
 
    <label className="block mb-2 font-medium">First Name:</label>
    <input
      type="text"
      value={firstname}
      onChange={(e) => setFirstname(e.target.value)}
      placeholder="Enter your first name"
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 
     <label className="block mb-2 font-medium">Last Name:</label>
    <input
      type="text"
      value={lastname}
      onChange={(e) => setLastname(e.target.value)}
      placeholder="Enter your last name"
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 
    <label className="block mb-2 font-medium">Password:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 
    <label className="block mb-2 font-medium">Email:</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 
    <label className="block mb-2 font-medium">Phone Number:</label>
    <input
      type="number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="Enter your phone number"
      className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 
    {role === 'Student' && (
      <div className="flex flex-col">
        <label className="block mb-2 font-medium">School:</label>
        <select
        value={schoolID}
        onChange={(e) => setSchoolID(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Select School</option>
          <option value="1001">University of Kentucky</option>
          <option value="1002">University of Louisville</option>
          <option value="1003">Western Kentucky University</option>
          <option value="1004">Eastern Kentucky University</option>
        </select>
 
        <label className="block mb-2 font-medium">Dorm:</label>
        <input
          type="text"
          value={dorm}
          onChange={(e) => setDorm(e.target.value)}
          placeholder="Enter your dorm building"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
 
        <label className="block mb-2 font-medium">Room number:</label>
        <input
          type="text"
          value={roomnum}
          onChange={(e) => setRoomNum(e.target.value)}
          placeholder="Enter your room number"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    )}

    {role === "Liaison" && 
      <div className="flex flex-col">
        <label className="block mb-2 font-medium">School:</label>
        <select
        value={schoolID}
        onChange={(e) => setSchoolID(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Select School</option>
          <option value="1001">University of Kentucky</option>
          <option value="1002">University of Louisville</option>
          <option value="1003">Western Kentucky University</option>
          <option value="1004">Eastern Kentucky University</option>
        </select>
      </div>
    }
 
    <button
      type="submit"
      onClick={handleSubmission}
      className={`ml-4 px-5 py-2 !text-white !font-semibold !rounded-lg !shadow-md !transition !${c.bg} !${c.hover}`}
    >
      Sign Up
    </button>

    </form>

  </div>
  </div>
  )
}

// Sign-in page
function SignInPage({ title, color, description, dashboardPath }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedIn] = useState(true);

  const colorMap = {
    blue: { text: "text-blue-700", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
    green: { text: "text-green-700", bg: "bg-green-600", hover: "hover:bg-green-700" },
    purple: { text: "text-purple-700", bg: "bg-purple-600", hover: "hover:bg-purple-700" },
    amber: { text: "text-amber-700", bg: "bg-amber-600", hover: "hover:bg-amber-700" },
  };

  const c = colorMap[color] || colorMap.blue;

  async function handleSignIn() {
 
    try {
    const response = await fetch(`http://localhost:5000/api/user/${email}/${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Fetched user:", data);

    if(data.success) {
      setUser(data.user)
    }
    console.log(user);
    if (data.user.Role === "Student") navigate("/student/dashboard");
    else if (data.user.Role === "Worker") navigate("/worker/dashboard");
    else if (data.user.Role === "Liaison") navigate("/liaison/dashboard");
    else if (data.user.Role === "Campus Housing") navigate("/campusHousing/dashboard");
    else alert("Unknown username.");
  } catch (error) {
    console.error("Error:", error);
    setLoggedIn(false);
  }
}

  return (  
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h2 className={`text-3xl font-bold ${c.text} mb-4`}>{title || "Sign In"}</h2>
      <p className="text-gray-600 max-w-2xl mb-4">
        {description || "Please enter your credentials to continue."}
      </p>

      {/* FORM IMPLEMENTATION */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <label htmlFor="emailInput" className="block mb-2 font-medium">
          Enter your email:
        </label>
        <input
          type="text"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <br />
        <br />

        <label htmlFor="passwordInput" className="block mb-2 font-medium">
          Enter your password:
        </label>
        <input
          type="password"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <br />
        <br />

        <div>
          {loggedin ? (
            <p style={{display:'none'}}>Invalid email or password. Try again.</p>
          ) : (
            <>
            <p style={{color: 'red'}}>Invalid email or password. Try again.</p>
            <br />
            <br />
            </>
          )}
        </div>

        <button
          type="submit"
          className={`ml-4 px-5 py-2 text-blue-800 font-semibold rounded-lg shadow-md transition ${c.bg} ${c.hover}`}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

function StudentDashboard() {
  const { user } = useContext(UserContext);
  const [activeForm, setActiveForm] = useState(null);
  const [serviceDate, setServiceDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [condition, setCondition] = useState("Clean");
  const [preferredTimes, setPreferredTimes] = useState({});
  const [notes, setNotes] = useState("");

  const handleCancel = () => {
    setActiveForm(null);
    resetForm();
  };

  const resetForm = () => {
    setServiceDate("");
    setDeadlineDate("");
    setCondition("Clean");
    setPreferredTimes({});
    setNotes("");
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const formattedTimes = {};
  for (const [day, info] of Object.entries(preferredTimes)) {
    if (info.selected) {
      formattedTimes[day] = [info.start || "", info.end || ""];
    }
  }

  const requestData = {
    uid: user["UID"],
    sno: user["School ID"],
    service_type: activeForm,
    request_date: new Date().toISOString().split("T")[0],
    service_date: serviceDate,
    deadline_date: deadlineDate,
    condition,
    preferred_times: JSON.stringify(formattedTimes),
    notes,
  };

  console.log("Submitting request:", requestData);

  fetch("http://localhost:5000/api/insert/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      // Log status and headers first
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Headers:", [...response.headers.entries()]);

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If not JSON, read as text to see what it really is
        return response.text().then((text) => {
          console.error("Expected JSON but got:", text);
          throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
        });
      }

      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert(`Request for ${activeForm} submitted.`);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert(`Request for ${activeForm} failed, please try again.`);
    });

    resetForm();
    setActiveForm(null);
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Student Dashboard</h1>
      <h2 className="text-3xl font-bold mb-8 text-blue-800">Hello {user["First Name"]}</h2>

      {/* Grid of Service Options */}
      {!activeForm && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { name: "Pickup", icon: "📦", description: "Request a pickup service." },
            { name: "Maintenance", icon: "🛠️", description: "Request maintenance or repair." },
            { name: "Delivery", icon: "🚚", description: "Request a delivery service." },
          ].map((service) => (
            <div
              key={service.name}
              onClick={() => setActiveForm(service.name)}
              className="cursor-pointer bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md transition transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Form */}
      {activeForm && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white mt-8 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            {activeForm} Request Form
          </h2>

          {/* Type of Service */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type of Service
            </label>
            <input
              type="text"
              value={activeForm}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Request Date (auto-filled) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Request Date
            </label>
            <input
              type="date"
              value={new Date().toISOString().split("T")[0]}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Service Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service Date
            </label>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Deadline Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deadline Date (optional)
            </label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty</option>
            </select>
          </div>

          {/* Preferred Times */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Times
            </label>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={day}
                    checked={preferredTimes[day]?.selected || false}
                    onChange={(e) =>
                      setPreferredTimes({
                        ...preferredTimes,
                        [day]: {
                          ...preferredTimes[day],
                          selected: e.target.checked,
                        },
                      })
                    }
                  />
                  <label htmlFor={day} className="w-24">
                    {day}
                  </label>

                  {preferredTimes[day]?.selected && (
                    <div className="flex space-x-2">
                      <input
                        type="time"
                        value={preferredTimes[day]?.start || ""}
                        onChange={(e) =>
                          setPreferredTimes({
                            ...preferredTimes,
                            [day]: {
                              ...preferredTimes[day],
                              start: e.target.value,
                            },
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={preferredTimes[day]?.end || ""}
                        onChange={(e) =>
                          setPreferredTimes({
                            ...preferredTimes,
                            [day]: {
                              ...preferredTimes[day],
                              end: e.target.value,
                            },
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={250}
              className="w-full border rounded px-3 py-2"
              placeholder="Any additional details..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 !bg-gray-300 !hover:bg-gray-400 !rounded-lg !font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 !bg-blue-600 !text-white !hover:bg-blue-700 !rounded-lg !font-semibold transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


function WorkerDashboard() {
  const { user } = useContext(UserContext);
  const [view, setView] = useState('main');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WID = user["UID"];

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/service/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch service requests');
        const data = await res.json();

        const uniqueUIDs = [...new Set(data.map((req) => req.UID))];

        // Fetch all users, but don't fail the whole thing if one is missing
        const userPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/user/${uid}`)
            .then((r) => {
              if (!r.ok) {
                console.warn(`User not found for UID: ${uid} (${r.status})`);
                return null; // Mark as missing instead of throwing
              }
              return r.json();
            })
            .catch((err) => {
              console.warn(`Failed to fetch user ${uid}:`, err);
              return null;
            })
        );

        const userResults = await Promise.allSettled(userPromises);
        
        console.log("User results:");
        console.log(userResults);
        // Extract successfully fetched users
        const successfulUsers = userResults
          .filter((r) => r.status === "fulfilled" && r.value !== null)
          .map((r) => r.value[0]);


        const userMap = Object.fromEntries(
          successfulUsers.map((u) => [u.UID, u])
        );


        console.log("Successful users:");
        console.log(successfulUsers);

        // Enrich requests with location
        const enriched = data.map((req) => {
          const userData = userMap[req.UID];
          const location = userData?.Dorm && userData?.Room
            ? `${userData.Dorm} ${userData.Room}`
            : 'Location N/A';
          return { ...req, location };
        });
        
        console.log("enriched:");
        console.log(enriched);

        const filteredRequests = enriched.filter((req) => req.WID === WID);

        setRequests(filteredRequests);
        //setRequests(enriched);
        console.log(filteredRequests);
      } catch (err) {
        console.error('Error loading service requests:', err);
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);


const changeCondition = async (id, condition) => {
  if (condition == 'Clean'){
    condition = 'Dirty';
  }
  else{
    condition = 'Clean';
  }
  
  if (!window.confirm(`Mark this fridge as '${condition}'?`)) return;

  try {
    const res = await fetch(`http://localhost:5000/api/service/${id}/${condition}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condition }),
    });

    if (!res.ok) throw new Error("Failed to update condition");

    setRequests((prev) =>
      prev.map((r) =>
        r.SID === id ? { ...r, Condition: condition } : r
      )
    );

  } catch (err) {
    console.error("Failed to update:", err);
    alert("Failed to update job status.");
  }
};


const changeStatus = async (id, status) => {
  if (status == 'Completed'){
    status = 'In Progress';
  }
  else{
    status = 'Completed';
  }
  
  if (!window.confirm(`Mark this job as '${status}'?`)) return;

  try {
    const res = await fetch(`http://localhost:5000/api/service/${id}/${status}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update status");

    setRequests((prev) =>
      prev.map((r) =>
        r.SID === id ? { ...r, Status: status } : r
      )
    );

  } catch (err) {
    console.error("Failed to update:", err);
    alert("Failed to update job status.");
  }
};



  /* ============================================================
     MAIN WORKER DASHBOARD VIEW
     ============================================================ */
  if (view === 'main') {
    const cards = [
      {
        title: 'Fridge Request',
        desc: 'View and complete assigned fridge-related tasks.',
        action: () => setView('requests'),
      },
      {
        title: 'Log Dirty Fridge',
        desc: 'Report a fridge that needs cleaning or removal.',
        action: () => alert('Open Dirty Fridge form'),
      },
      {
        title: 'Fridge Scanner (Coming Soon)',
        desc: 'Scan fridge barcodes to update inventory instantly.',
        action: () => alert('Scanner feature coming soon'),
      },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
        <div className="px-6 py-10 sm:pl-12">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Worker Dashboard
          </h2>

          <h2 className="text-3xl font-bold mb-8 text-green-800">
            Hello {user?.['First Name'] || 'Worker'}
          </h2>

          <p className="text-gray-600 mb-8">Submit your logs and track tasks.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  {card.title}
                </h3>

                <p className="text-gray-600 mb-5">{card.desc}</p>

                <button
                  onClick={card.action}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     FRIDGE REQUEST TABLE SUBMENU VIEW
     ============================================================ */
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <button
        onClick={() => setView('main')}
        className="mb-6 px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition"
      >
        ← Back to Worker Dashboard
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Fridge Requests
      </h1>

      <p className="text-gray-600 mb-8">
        Complete your assigned fridge-related jobs.
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-600">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
          <table className="w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="px-7 py-5 font-semibold text-green-800">Job Type</th>
                <th className="px-7 py-5 font-semibold text-green-800">Scheduled For</th>
                <th className="px-7 py-5 font-semibold text-green-800">Location</th>
                <th className="px-7 py-5 font-semibold text-green-800">Notes</th>
                <th className="px-7 py-5 font-semibold text-green-800">Status</th>
                <th className="px-7 py-5 font-semibold text-green-800">Condition</th>
                <th className="px-7 py-5 font-semibold text-green-800">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-7 py-5">{req['Type of Service'] || 'N/A'}</td>
                  <td className="px-7 py-5">
                    {req['Service Date']
                      ? new Date(req['Service Date']).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-7 py-5">{req.location}</td>
                  <td className="px-7 py-5">{req.Notes || 'None'}</td>
                  <td className="px-7 py-5">{req.Status || 'None'}</td>
                  <td className="px-7 py-5">{req.Condition || 'None'}</td>
                  <td className="px-7 py-5">
                    <button
                      onClick={() => changeStatus(req.SID, req.Status)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Change Status
                    </button>
                  </td>
                                    <td className="px-7 py-5">
                    <button
                      onClick={() => changeCondition(req.SID, req.Condition)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Change Condition
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}



function LiaisonDashboard() {
  const { user } = useContext(UserContext);
  const [view, setView] = useState("main"); 
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workers, setWorkers] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState({});

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const SCHOOLS = {
    1001: "University of Kentucky",
    1002: "University of Louisville",
    1003: "Western Kentucky University",
    1004: "Eastern Kentucky University"
  }
  const campusID = user["School ID"];
  const schoolName = SCHOOLS[campusID];

  // main = card view, schools = schools submenu


    useEffect(() => {
      const loadData = async() => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('http://localhost:5000/api/service/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch request data');
        const data = await res.json();
        const filteredData = data?.filter(req => req.SNO === campusID) || [];

        const uniqueUIDs = [...new Set(data.map((req) => req.UID))];

        // Fetch all users, but don't fail the whole thing if one is missing
        const userPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/user/${uid}`)
            .then((r) => {
              if (!r.ok) {
                console.warn(`User not found for UID: ${uid} (${r.status})`);
                return null; // Mark as missing instead of throwing
              }
              return r.json();
            })
            .catch((err) => {
              console.warn(`Failed to fetch user ${uid}:`, err);
              return null;
            })
        );

        
        // Fetch workers
        const workersRes = await fetch('http://localhost:5000/api/users/workers');
        if (!workersRes.ok) throw new Error('Failed to fetch workers');
        const workerData = await workersRes.json();
        setWorkers(workerData);
        console.log('Workers:', workerData);

        const userResults = await Promise.allSettled(userPromises);
        
        console.log("User results:");
        console.log(userResults);
        // Extract successfully fetched users
        const successfulUsers = userResults
          .filter((r) => r.status === "fulfilled" && r.value !== null)
          .map((r) => r.value[0]);


        const userMap = Object.fromEntries(
          successfulUsers.map((u) => [u.UID, u])
        );


        console.log("Successful users:");
        console.log(successfulUsers);

        // Enrich requests with location
        const enriched = filteredData.map((req) => {
          const userData = userMap[req.UID];
          const location = userData?.Dorm && userData?.Room
            ? `${userData.Dorm} ${userData.Room}`
            : 'Location N/A';
          return { ...req, location };
        });
        
        console.log("enriched:");
        console.log(enriched);

        setRequests(enriched);
        console.log(enriched);
      } catch (err) {
        console.error('Error loading service requests:', err);
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
    }, []);

    useEffect(() => {
      console.log('Requests updated:', requests)
    }, [requests])

  /* ============================================================
     SAMPLE JOB DATA (replace with real DB later)
     ============================================================ */

  const countsByType = useMemo(() => {
    if(!requests) { return {} }
    const out = {};
    requests.forEach(j => { 
      const type = j["Type of Service"]
      out[type] = (out[type] || 0) + 1; });
    return out;
  }, [requests]);

  const countsByStatus = useMemo(() => {
    if(!requests) { return {} }
    const out = {};
    requests.forEach(j => { 
      const status = j["Status"]
      out[status] = (out[status] || 0) + 1; });
    return out;
  }, [requests]);

  async function updateWorkers(SID, WID) {
  try {
    const res = await fetch(`http://localhost:5000/api/services/${SID}/${WID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to update worker");

    setRequests((prev) =>
      prev.map((r) =>
        r.SID === SID ? { ...r, WID: WID } : r
      )
    );

    alert("Worker assigned successfully!");
  } catch (err) {
    console.error("Failed to update:", err);
    alert("Failed to assign worker.");
  }
}

  /* ============================================================
     MAIN DASHBOARD VIEW
     ============================================================ */
  if (view === "main") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
        <div className="px-6 py-10 sm:pl-12">

          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Liaison Dashboard
          </h2>

          <h2 className="text-3xl font-bold mb-8 text-purple-800">
            Hello {user["First Name"]}
          </h2>

           <h2 className="text-2xl font-bold mb-8 text-black-800">
            {schoolName}
          </h2>

          <p className="text-gray-600 mb-8">
            Manage school metrics and worker activity.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                Schools Dashboard
              </h3>
              <p className="text-gray-600 mb-5">
                View maintenance requests, deadlines, and fridge assignments.
              </p>
              <button
                onClick={() => setView("schools")}
                className="px-5 py-2 !bg-purple-600 !text-white rounded-lg !hover:bg-purple-700 transition"
              >
                Open
              </button>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                Worker Metrics
              </h3>
              <p className="text-gray-600 mb-5">
                Track worker hours, payment status, and task performance.
              </p>
              <button className="px-5 py-2 !bg-purple-600 !text-white rounded-lg !hover:bg-purple-700 transition">
                Open
              </button>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                Generate Reports
              </h3>
              <p className="text-gray-600 mb-5">
                Export summarized performance and maintenance data.
              </p>
              <button className="px-5 py-2 !bg-purple-600 !text-white rounded-lg !hover:bg-purple-700 transition">
                Open
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ============================================================
     SCHOOLS DASHBOARD SUBMENU VIEW
     ============================================================ */
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">

      <button
        onClick={() => setView("main")}
        className="mb-6 px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition"
      >
        ← Back to Liaison Dashboard
      </button>

      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Schools Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Overview of scheduled school jobs and completion status.
      </p>
      

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
        <table className="w-full text-left">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-purple-800">Job Type</th>
              <th className="px-4 py-3 font-semibold text-purple-800">Job ID</th>
              <th className="px-4 py-3 font-semibold text-purple-800">Building</th>
              <th className="px-4 py-3 font-semibold text-purple-800">Scheduled For</th>
              <th className="px-4 py-3 font-semibold text-purple-800">Worker</th>
              <th className="px-4 py-3 font-semibold text-purple-800"></th>
              <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(r => (
              <tr key={r["SID"]} className="border-t">
                <td className="px-4 py-3">{r["Type of Service"]}</td>
                <td className="px-4 py-3">{r["SID"]}</td>
                <td className="px-4 py-3">{r["location"]}</td>
                <td className="px-4 py-3">
                  {r['Service Date']
                      ? new Date(r['Service Date']).toLocaleDateString()
                      : 'N/A'}
                </td>
                <td className="px-4 py-3">
                  <select className="px-4 py-2 border rounded-lg" 
                  value={selectedWorkers[r.SID || r.WID]} 
                  onChange={(e) => setSelectedWorkers(prev => ({
                  ...prev,
                  [r.SID]: e.target.value
                  }))}>
                    <option value="">Select a worker</option>
                      {workers.map(worker => (
                      <option key={worker.UID} value={worker.UID}>
                        {worker["Last Name"]}, {worker["First Name"]}
                      </option>
                      ))}
                  </select>
                  </td>
                  <td>
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                    onClick={() => updateWorkers(r["SID"], selectedWorkers[r.SID])}
                    disabled={!selectedWorkers[r.SID]}>
                      Save
                    </button>
                  </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    r["Status"] === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {r["Status"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AGGREGATES */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-6 bg-white rounded-2xl shadow border">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Jobs by Type</h2>
          {Object.entries(countsByType).map(([type, count]) => (
            <p key={type} className="text-gray-700">
              {type}: <span className="font-bold">{count}</span>
            </p>
          ))}
        </div>

        <div className="p-6 bg-white rounded-2xl shadow border">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Jobs by Status</h2>
          {Object.entries(countsByStatus).map(([status, count]) => (
            <p key={status} className="text-gray-700">
              {status}: <span className="font-bold">{count}</span>
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}


function CampusHousingDashboard() {
  const { user } = useContext(UserContext);
  const cards = [
    {
      title: "Schools Dashboard",
      desc: "View maintenance requests and fridge status by school.",
      action: () => alert("View Schools Dashboard"),
    },
    {
      title: "Assign Fridges",
      desc: "Assign fridges to specific rooms for faster coordination.",
      action: () => alert("Assign Fridges form"),
    },
    {
      title: "Logistics Overview",
      desc: "See fridge distribution, deliveries, and pending tasks.",
      action: () => alert("Open Logistics Overview"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
    <div className="px-6 py-10 sm:pl-12">
      <h2 className="text-4xl font-bold text-amber-700 mb-6">
        Campus Housing Dashboard
      </h2>
      <h2 className="text-3xl font-bold mb-8 text-amber-800">Hello {user["First Name"]}</h2>
      <p className="text-gray-600 mb-8">
        Manage fridge logistics and assignments for your campuses.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold text-amber-700 mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600 mb-5">{card.desc}</p>
            <button
              onClick={card.action}
              className="px-5 py-2 !bg-amber-600 !text-white rounded-lg !hover:bg-amber-700 transition"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

function App() {

  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    amber: "bg-amber-600 hover:bg-amber-700",
  };



  return (
    <UserProvider>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <nav className="bg-blue-800 text-blue-100 flex justify-between items-center px-6 py-3 shadow-lg relative">
        <div className="flex items-center gap-3">
          <Link to="/">
            <button className="hidden sm:inline-block bg-white text-blue-800 font-semibold px-3 py-1 rounded-md shadow hover:bg-blue-50 transition">
              Home
            </button>
          </Link>
        </div>

        <h1 className="text-lg sm:text-xl font-semibold tracking-wide" style={{ padding: "12px" }}>
          Minifridge App
        </h1>
      </nav>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Dashboard pages */}
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/worker/dashboard"
            element={<WorkerDashboard />}
          />
          <Route
            path="/liaison/dashboard"
            element={<LiaisonDashboard />}
          />
          <Route
            path="/campusHousing/dashboard"
            element={<CampusHousingDashboard />}
          />
          <Route
            path="/signup"
            element={
              <Signup
                color="blue"
                description="Create your account by filling out the form below."
              />
            }
          />
        </Routes>
      </main>

      <footer className="bg-blue-800 text-white text-center py-3 mt-auto shadow-inner">
        <Link to="/" onClick={() => setMenuOpen(false)} className="w-4/5 sm:hidden">
          <button className="w-4/5 py-2 rounded-md font-semibold text-blue-800 bg-white shadow hover:bg-blue-50 transition">
            Home
          </button>
        </Link>
      </footer>
    </div>
    </UserProvider>
  );
}

export default App;
