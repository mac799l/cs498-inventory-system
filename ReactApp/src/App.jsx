import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext, useMemo } from "react";
import {
  TruckIcon,
  WrenchScrewdriverIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

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

  // Fridge status
  const [hasFridge, setHasFridge] = useState(null); // null = loading
  const [fridgeCheckError, setFridgeCheckError] = useState(false);

  // Check if student has a fridge assigned
  useEffect(() => {
    const checkFridgeAssignment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/has-fridge?uid=${user.UID}`
        );
        const data = await response.json();

        setHasFridge(data.has_fridge === true);
      } catch (err) {
        console.error("Failed to check fridge assignment:", err);
        setFridgeCheckError(true);
        setHasFridge(false);
      }
    };

    if (user?.UID) {
      checkFridgeAssignment();
    }
  }, [user?.UID]);

  const handleServiceClick = (serviceName) => {
    const requiresFridge = serviceName === "Pickup" || serviceName === "Maintenance";

    if (requiresFridge && hasFridge === false) {
      alert(
        `You cannot request ${serviceName} because you do not have a fridge assigned.\n\n` +
          "Please request a Delivery first or contact Housing Services."
      );
      return;
    }

    if (hasFridge === null) {
      alert("Checking your fridge assignment... Please try again in a moment.");
      return;
    }

    if (fridgeCheckError) {
      alert("Unable to verify fridge status. Please refresh the page.");
      return;
    }

    setActiveForm(serviceName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiresFridge = activeForm === "Pickup" || activeForm === "Maintenance";
    if (requiresFridge && !hasFridge) {
      alert("Request blocked: You do not have an assigned fridge.");
      return;
    }

    const formattedTimes = {};
    for (const [day, info] of Object.entries(preferredTimes)) {
      if (info.selected) {
        formattedTimes[day] = [info.start || "", info.end || ""];
      }
    }

    const requestData = {
      uid: user.UID,
      sno: user["School ID"],
      service_type: activeForm,
      request_date: new Date().toISOString().split("T")[0],
      service_date: serviceDate || new Date().toISOString().split("T")[0],
      deadline_date: deadlineDate || null,
      condition: activeForm === "Pickup" ? condition : null,
      preferred_times: Object.keys(formattedTimes).length > 0 ? JSON.stringify(formattedTimes) : null,
      notes: notes || null,
    };

    fetch("http://localhost:5000/api/insert/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.message?.includes("success")) {
          alert(`Your ${activeForm} request has been submitted successfully!`);
          resetForm();
          setActiveForm(null);
        } else {
          throw new Error(data.message || "Request failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit request. Please try again later.");
      });
  };

  const resetForm = () => {
    setServiceDate("");
    setDeadlineDate("");
    setCondition("Clean");
    setPreferredTimes({});
    setNotes("");
  };

  const handleCancel = () => {
    setActiveForm(null);
    resetForm();
  };

  // Loading state
  if (hasFridge === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading your fridge status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-2 text-blue-800">Student Dashboard</h1>
      <h2 className="text-2xl mb-8 text-blue-900">Hello {user["First Name"]}</h2>

      {/* Warning Banner */}
      {hasFridge === false && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 rounded mb-8 max-w-2xl">
          <p className="font-bold">No Fridge Assigned</p>
          <p className="text-sm">
            You cannot request Pickup or Maintenance until a fridge is delivered.
            You can still request a <strong>Delivery</strong>.
          </p>
        </div>
      )}

      {/* Service Selection Cards */}
      {!activeForm && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { name: "Delivery",    Icon: TruckIcon,              description: "Request fridge delivery" },
            { name: "Pickup",      Icon: InboxIcon,              description: "Schedule fridge pickup" },
            { name: "Maintenance", Icon: WrenchScrewdriverIcon,  description: "Report a fridge issue" },
          ].map((service) => {
            const requiresFridge = service.name !== "Delivery";
            const isDisabled = requiresFridge && hasFridge === false;

            return (
              <div
                key={service.name}
                onClick={() => !isDisabled && handleServiceClick(service.name)}
                className={`relative bg-white rounded-2xl p-10 shadow-xl transition-all text-center
                  ${isDisabled
                    ? "opacity-60 cursor-not-allowed grayscale"
                    : "hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-blue-300"
                  }`}
              >
                <service.Icon className="w-20 h-20 mx-auto mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>

                {isDisabled && (
                  <div className="mt-4 p-2 bg-red-100 rounded text-red-700 text-sm font-medium">
                    Requires assigned fridge
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Request Form - Show for Delivery OR if user has fridge */}
      {activeForm && (activeForm === "Delivery" || hasFridge) && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white mt-12 p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            {activeForm} Request
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Service Type</label>
              <input
                type="text"
                value={activeForm}
                readOnly
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Request Date</label>
              <input
                type="text"
                value={new Date().toISOString().split("T")[0]}
                readOnly
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Deadline Date (Optional)
            </label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {activeForm === "Pickup" && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Fridge Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="Clean">Clean</option>
                <option value="Dirty">Dirty (will incur cleaning fee)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-3">Preferred Times</label>
            <div className="bg-gray-50 p-5 rounded-lg space-y-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <div key={day} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id={day}
                      checked={preferredTimes[day]?.selected || false}
                      onChange={(e) =>
                        setPreferredTimes({
                          ...preferredTimes,
                          [day]: { ...preferredTimes[day], selected: e.target.checked },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label htmlFor={day} className="w-28 font-medium">{day}</label>
                    {preferredTimes[day]?.selected && (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={preferredTimes[day]?.start || ""}
                          onChange={(e) =>
                            setPreferredTimes({
                              ...preferredTimes,
                              [day]: { ...preferredTimes[day], start: e.target.value },
                            })
                          }
                          className="px-3 py-2 border rounded"
                        />
                        <span className="text-gray-600">to</span>
                        <input
                          type="time"
                          value={preferredTimes[day]?.end || ""}
                          onChange={(e) =>
                            setPreferredTimes({
                              ...preferredTimes,
                              [day]: { ...preferredTimes[day], end: e.target.value },
                            })
                          }
                          className="px-3 py-2 border rounded"
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              rows={4}
              placeholder="Any access instructions, special requests, or details..."
              className="w-full px-4 py-3 border rounded-lg resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 !bg-blue-600 !hover:bg-blue-700 !text-white font-semibold rounded-lg transition shadow-lg"
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
  const [userMap, setUserMap] = useState({});
  
  // NEW: Status filter state
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'in_progress' | 'completed'

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

        const userPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/user/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        const trackerPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/fridge_tracker/owner/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        const [userResults, trackerResults] = await Promise.all([
          Promise.allSettled(userPromises),
          Promise.allSettled(trackerPromises),
        ]);

        const successfulUsers = userResults
          .filter((r) => r.status === 'fulfilled' && r.value)
          .map((r) => (Array.isArray(r.value) ? r.value[0] : r.value));

        const userMap = Object.fromEntries(
          successfulUsers.map((u) => [u.UID, u])
        );

        const fridgeMap = {};
        trackerResults.forEach((result, index) => {
          const uid = uniqueUIDs[index];
          if (result.status === 'fulfilled' && result.value) {
            const data = Array.isArray(result.value) ? result.value[0] : result.value;
            fridgeMap[uid] = data?.FID || null;
          } else {
            fridgeMap[uid] = null;
          }
        });

        setUserMap(userMap);

        const enriched = data.map((req) => {
          const userData = userMap[req.UID] || {};
          const location = userData.Dorm && userData.Room
            ? `${userData.Dorm} ${userData.Room}`
            : 'Location N/A';

          const currentFID = fridgeMap[req.UID] || null;

          return {
            ...req,
            location,
            FID: currentFID,
            tempFID: '',
            userData,
          };
        });

        setRequests(enriched);
      } catch (err) {
        console.error('Error loading requests:', err);
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

// Toggle Clean/Dirty
  const changeCondition = async (id, currentCondition) => {
    const newCondition = currentCondition === 'Clean' ? 'Dirty' : 'Clean';
    if (!window.confirm(`Mark fridge as '${newCondition}'?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/service/${id}/${newCondition}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: newCondition }),
      });

      if (!res.ok) throw new Error('Failed to update condition');

      setRequests((prev) =>
        prev.map((r) => (r.SID === id ? { ...r, Condition: newCondition } : r))
      );
    } catch (err) {
      alert('Failed to update condition.');
    }
  };

  // Clear ownership when pickup is completed
  const clearFridgeOwnership = async (fid, uid) => {
    if (!fid) return;
    try {
      const res = await fetch(`http://localhost:5000/api/update/fridge_tracker/fid/${fid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Owner: null,
          School: null,
          Location: "Warehouse",
          Moved: new Date().toISOString(),
          Room: null,
          Status: "Dirty",
          uid: uid
        }),
      });

      if (!res.ok) throw new Error('Failed to clear fridge ownership');
      console.log('Fridge ownership cleared (pickup completed)');
    } catch (err) {
      console.error(err);
      alert('Warning: Pickup completed, but fridge was not removed from tracking.');
    }
  };

  // Main status toggle
  const changeStatus = async (req) => {
    const isPickup = req['Type of Service']?.toLowerCase().includes('pickup');
    const isDelivery = req['Type of Service']?.toLowerCase().includes('delivery');
    const newStatus = req.Status === 'Completed' ? 'In Progress' : 'Completed';

    if (!window.confirm(`Mark this job as '${newStatus}'?`)) return;

    let fidToUse = req.FID;

    // Force FID entry only when completing a DELIVERY
    if (newStatus === 'Completed' && isDelivery) {
      const inputFID = (req.tempFID || '').trim();
      if (!inputFID) {
        alert('Please enter the FID of the fridge you delivered.');
        return;
      }
      fidToUse = inputFID;
    }

    // Update service request status
    try {
      const res = await fetch(`http://localhost:5000/api/service/${req.SID}/${newStatus}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
    } catch (err) {
      alert('Failed to update job status.');
      return;
    }

    // If pickup completed, remove from fridge_tracker
    if (newStatus === 'Completed' && isPickup && req.FID) {
      await clearFridgeOwnership(req.FID, req.UID);
    }

    // Log movement in tracking table
    if (fidToUse || req.FID) {
      const fidForTracking = fidToUse || req.FID;

      // Only update tracker if we're completing a delivery OR pickup
      if (newStatus === 'Completed' && (isDelivery || isPickup)) {
        const studentInfo = userMap[req.UID] || {};

        const payload = {
          // Only set Owner for delivery; clear it for pickup; leave unchanged for others
          Owner: isDelivery ? req.UID : isPickup ? null : undefined,
          School: isDelivery ? req.SNO : isPickup ? null : undefined,
          Location: isDelivery ? studentInfo.Dorm : isPickup ? null : undefined,
          Room: isDelivery ? studentInfo.Room : isPickup ? null : undefined,
          Moved: new Date().toISOString(),
          Status: req.Condition || "Dirty",
        
        };

        // Remove undefined fields to prevent accidental overwrites
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        try {
          const res = await fetch(`http://localhost:5000/api/update/fridge_tracker/fid/${fidForTracking}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Failed to update tracking');
        } catch (err) {
          console.error(err);
          alert('Job completed, but fridge tracking update failed.');
        }
      }
    }

    // Update UI
    setRequests((prev) =>
      prev.map((r) =>
        r.SID === req.SID
          ? {
              ...r,
              Status: newStatus,
              FID: newStatus === 'Completed' && isDelivery ? fidToUse : r.FID,
              tempFID: '',
            }
          : r
      )
    );
  };

  // ──────── MAIN VIEW (Dashboard home) ────────
  if (view === 'main') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
        <div className="px-6 py-10 sm:pl-12">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Worker Dashboard</h2>
          <h2 className="text-3xl font-bold mb-8 text-green-800">
            Hello {user?.['First Name'] || 'Worker'}
          </h2>
          <p className="text-gray-600 mb-8">Submit your logs and track tasks.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 max-w-5xl">
            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-green-700 mb-3">Fridge Requests</h3>
              <p className="text-gray-600 mb-5">View and complete assigned fridge-related tasks.</p>
              <button
                onClick={() => setView('requests')}
                className="px-5 py-2 !bg-green-600 !text-white rounded-lg hover:bg-green-700 transition"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ──────── REQUESTS TABLE VIEW (with filter!) ────────
  // Filter worker's own jobs + apply status filter
  const filteredRequests = requests
    .filter((req) => req.WID === user.UID)
    .filter((req) => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'in_progress') return req.Status !== 'Completed';
      if (statusFilter === 'completed') return req.Status === 'Completed';
      return true;
    });

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <button
        onClick={() => setView('main')}
        className="mb-6 px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition"
      >
        ← Back to Worker Dashboard
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-6">Fridge Requests</h1>
      <p className="text-gray-600 mb-8">Complete your assigned fridge-related jobs.</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* ──────── STATUS FILTER ──────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">Show:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Jobs</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <p className="text-gray-600">
          Showing <strong>{filteredRequests.length}</strong> job{filteredRequests.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <p className="text-gray-600 text-center py-10">Loading requests...</p>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-xl text-gray-500">
            {statusFilter === 'all'
              ? 'No requests assigned to you yet.'
              : `No ${statusFilter === 'in_progress' ? 'in-progress' : 'completed'} jobs at the moment.`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
          <table className="w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-green-800">Job Type</th>
                <th className="px-6 py-4 font-semibold text-green-800">Date</th>
                <th className="px-6 py-4 font-semibold text-green-800">Location</th>
                <th className="px-6 py-4 font-semibold text-green-800">Notes</th>
                <th className="px-6 py-4 font-semibold text-green-800">Status</th>
                <th className="px-6 py-4 font-semibold text-green-800">Condition</th>
                <th className="px-6 py-4 font-semibold text-green-800">Current FID</th>
                <th className="px-6 py-4 font-semibold text-green-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.SID} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{req['Type of Service'] || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {req['Deadline Date']
                      ? new Date(req['Deadline Date']).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">{req.location}</td>
                  <td className="px-6 py-4">{req.Notes || '—'}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={req.Status === 'Completed' ? 'text-green-600' : 'text-orange-600'}>
                      {req.Status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{req.Condition || '—'}</td>
                  <td className="px-6 py-4 font-mono">{req.FID || '—'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <input
                      type="text"
                      placeholder="FID"
                      className="border rounded px-2 py-1 w-28 text-sm"
                      value={req.tempFID || ''}
                      onChange={(e) =>
                        setRequests((prev) =>
                          prev.map((r) =>
                            r.SID === req.SID ? { ...r, tempFID: e.target.value } : r
                          )
                        )
                      }
                    />

                    <button
                      onClick={() => changeStatus(req)}
                      className={`px-4 py-2 rounded text-white font-medium transition ${
                        req.Status === 'Completed'
                          ? '!bg-gray-500 hover:!bg-gray-600'
                          : '!bg-green-600 hover:!bg-green-700'
                      }`}
                    >
                      {req.Status === 'Completed' ? 'Re-open' : 'Complete'}
                    </button>

                    <button
                      onClick={() => changeCondition(req.SID, req.Condition)}
                      className="px-3 py-2 !bg-blue-600 !text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      {req.Condition === 'Clean' ? 'Mark Dirty' : 'Mark Clean'}
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
  const [fridges, setFridges] = useState(null);
  const [fridgesLoading, setFridgesLoading] = useState(false);
  const [fridgesError, setFridgesError] = useState(null);
  const { user } = useContext(UserContext);
  const [view, setView] = useState("main"); 
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workers, setWorkers] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // NEW: Filter state
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
  const loadFridges = async () => {
  setFridgesLoading(true);
  setFridgesError(null);
  try {
    // Fetch all fridges
    const res = await fetch('http://localhost:5000/api/fridges', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) throw new Error('Failed to fetch fridges');
    const data = await res.json();
    
    console.log('Fridges data:', data);
    
    // Filter by school
    const filteredData = data?.filter(fridge => fridge.School === campusID) || [];
    
    // Get unique owner UIDs
    const uniqueOwnerUIDs = [...new Set(filteredData.map(f => f.Owner).filter(Boolean))];
    
    // Fetch owner info
    const ownerPromises = uniqueOwnerUIDs.map((uid) =>
      fetch(`http://localhost:5000/api/user/${uid}`)
        .then((r) => {
          if (!r.ok) {
            console.warn(`Owner not found for UID: ${uid}`);
            return null;
          }
          return r.json();
        })
        .catch((err) => {
          console.warn(`Failed to fetch owner ${uid}:`, err);
          return null;
        })
    );
    
    const ownerResults = await Promise.allSettled(ownerPromises);
    const successfulOwners = ownerResults
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => r.value[0]);
    
    const ownerMap = Object.fromEntries(
      successfulOwners.map((u) => [u.UID, u])
    );
    
    // Enrich fridges with owner names
    const enriched = filteredData.map((fridge) => {
      const ownerData = ownerMap[fridge.Owner];
      const ownerName = ownerData 
        ? `${ownerData["First Name"]} ${ownerData["Last Name"]}`
        : 'Unassigned';
      
      return { 
        ...fridge, 
        ownerName,
        schoolName: SCHOOLS[fridge.School] || 'Unknown School'
      };
    });
    
    console.log('Enriched fridges:', enriched);
    setFridges(enriched);
  } catch (err) {
    console.error('Error loading fridges:', err);
    setFridgesError('Failed to load fridges. Please try again.');
  } finally {
    setFridgesLoading(false);
    }
  }; 
  
  useEffect(() => {
    console.log('Requests updated:', requests)
  }, [requests])
  
  
  const filteredRequests = useMemo(() => {
    if (!requests) return [];
    if (statusFilter === "All") {
      return requests;
    }
    return requests.filter(req => req["Status"] === statusFilter);
  }, [statusFilter, requests]);
  
  /* ============================================================
     AGGREGATE CALCULATIONS (using filtered data)
     ============================================================ */
  const countsByType = useMemo(() => {
    if (!filteredRequests) { return {} }
    const out = {};
    filteredRequests.forEach(j => { 
      const type = j["Type of Service"]
      out[type] = (out[type] || 0) + 1; 
    });
    return out;
  }, [filteredRequests]);
  
  const countsByStatus = useMemo(() => {
    if (!filteredRequests) { return {} }
    const out = {};
    filteredRequests.forEach(j => { 
      const status = j["Status"]
      out[status] = (out[status] || 0) + 1; 
    });
    return out;
  }, [filteredRequests]);

async function updateWorkers(SID, WID) {
  try {
    const workerID = parseInt(WID, 10);

    const res = await fetch(`http://localhost:5000/api/service/${SID}/setwid/${workerID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to update worker");

  
    const newWorker = workers.find(w => w.UID === workerID);

    setRequests((prev) =>
      prev.map((r) =>
        r.SID === SID
          ? {
              ...r,
              WID: workerID,                       
              workerName: newWorker                
            }
          : r
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
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl">
          {/* Schools Dashboard Card */}
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

          {/* Fridge Tracker Card */}
          <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all">
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">
              Fridge Tracker
            </h3>
            <p className="text-gray-600 mb-5">
              View all fridges assigned to your school and their status.
            </p>
            <button
              onClick={() => {
                setView("fridges");
                if (!fridges) loadFridges();
              }}
              className="px-5 py-2 !bg-purple-600 !text-white rounded-lg !hover:bg-purple-700 transition"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ============================================================
   FRIDGE TRACKER VIEW
   ============================================================ */
  if (view === "fridges") {
    return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <button
        onClick={() => setView("main")}
        className="mb-6 px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition"
      >
        ← Back to Liaison Dashboard
      </button>
      
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Fridge Tracker - {schoolName}
      </h1>
      <p className="text-gray-600 mb-8">
        Overview of all fridges assigned to your school.
      </p>
      
      {/* LOADING STATE */}
      {fridgesLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading fridges...</p>
        </div>
      )}
      
      {/* ERROR STATE */}
      {fridgesError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {fridgesError}
        </div>
      )}
      
      {/* TABLE */}
      {!fridgesLoading && !fridgesError && fridges && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
          <table className="w-full text-left">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-purple-800">Fridge ID</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Owner</th>
                <th className="px-4 py-3 font-semibold text-purple-800">School</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Building</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Room</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Last Moved</th>
              </tr>
            </thead>
            <tbody>
              {fridges.length > 0 ? (
                fridges.map(fridge => (
                  <tr key={fridge.FID} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm">{fridge.FID}</td>
                    <td className="px-4 py-3">{fridge.ownerName}</td>
                    <td className="px-4 py-3">{fridge.schoolName}</td>
                    <td className="px-4 py-3">{fridge.Location}</td>
                    <td className="px-4 py-3">{fridge.Room || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        fridge.Status === 'Clean'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {fridge.Status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {fridge.Moved 
                        ? new Date(fridge.Moved).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No fridges found for {schoolName}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* SUMMARY STATS */}
      {!fridgesLoading && !fridgesError && fridges && fridges.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow border">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Total Fridges</h2>
            <p className="text-4xl font-bold text-gray-800">{fridges.length}</p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow border">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Clean Fridges</h2>
            <p className="text-4xl font-bold text-green-600">
              {fridges.filter(f => f.Status === 'Clean').length}
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow border">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Dirty Fridges</h2>
            <p className="text-4xl font-bold text-orange-600">
              {fridges.filter(f => f.Status === 'Dirty').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
  }
  
  /* ============================================================
     SCHOOLS DASHBOARD SUBMENU VIEW (WITH FILTER)
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
      <p className="text-gray-600 mb-4">
        Overview of scheduled school jobs and completion status.
      </p>
      
      <div className="mb-6 flex items-center gap-3">
        <label htmlFor="statusFilter" className="font-semibold text-purple-700">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
        
        {/* Show count of filtered results */}
        <span className="text-gray-600">
          ({filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'})
        </span>
      </div>
      
      {/* LOADING/ERROR STATES */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading requests...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* TABLE */}
      {!loading && !error && requests && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
          <table className="w-full text-left">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-purple-800">Job Type</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Job ID</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Building</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Deadline</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Current Worker</th>
                <th className="px-4 py-3 font-semibold text-purple-800">Workers</th>
                <th className="px-4 py-3 font-semibold text-purple-800"></th>
                <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(r => (
                  <tr key={r["SID"]} className="border-t">
                    <td className="px-4 py-3">{r["Type of Service"]}</td>
                    <td className="px-4 py-3">{r["SID"]}</td>
                    <td className="px-4 py-3">{r["location"]}</td>
                    <td className="px-4 py-3">{r["Deadline Date"] ? new Date(r['Deadline Date']).toLocaleDateString()
                      : 'N/A'}</td>
                    <td className="px-4 py-3">
                    {(() => {
                      const worker = workers?.find(w => w.UID === r.WID);
                      return worker ? `${worker["First Name"]} ${worker["Last Name"]}` : "Unassigned";
                    })()}
                    </td>
                    <td className="px-4 py-3">
                      <select className="px-4 py-2 border rounded-lg" 
                      value={selectedWorkers[r.SID || r.WID]} 
                      onChange={(e) => setSelectedWorkers(prev => ({         
                      ...prev, [r.SID]: e.target.value}))}> 
                        <option value="">Select a worker</option>
                        {workers && workers.map(worker => (
                          <option key={worker.UID} value={worker.UID}>
                            {worker["First Name"]} {worker["Last Name"]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="px-4 py-2 !bg-blue-400 !text-white rounded-lg hover:bg-blue-700 transition-colors" 
                        onClick={() => updateWorkers(r["SID"], selectedWorkers[r.SID])}
                        disabled={!selectedWorkers[r.SID]}>Save</button>
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        r["Status"] === "Completed"
                          ? "text-green-600"
                          : r["Status"] === "In Progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {r["Status"]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No requests found with status "{statusFilter}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* AGGREGATES */}
      {!loading && !error && requests && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow border">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Jobs by Type</h2>
            {Object.keys(countsByType).length > 0 ? (
              Object.entries(countsByType).map(([type, count]) => (
                <p key={type} className="text-gray-700">
                  {type}: <span className="font-bold">{count}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow border">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Jobs by Status</h2>
            {Object.keys(countsByStatus).length > 0 ? (
              Object.entries(countsByStatus).map(([status, count]) => (
                <p key={status} className="text-gray-700">
                  {status}: <span className="font-bold">{count}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>
      )}
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
