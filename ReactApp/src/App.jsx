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
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


function StudentDashboard2() {
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
          {activeForm === "Pickup" && (
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
          )}

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
  const [userMap, setUserMap] = useState({});

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

        // Fetch user profiles
        const userPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/user/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        // Fetch current FID ownership
        const trackerPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/fridge_tracker/owner/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        const [userResults, trackerResults] = await Promise.all([
          Promise.allSettled(userPromises),
          Promise.allSettled(trackerPromises),
        ]);

        // Build user map
        const successfulUsers = userResults
          .filter((r) => r.status === 'fulfilled' && r.value)
          .map((r) => (Array.isArray(r.value) ? r.value[0] : r.value));

        const userMap = Object.fromEntries(
          successfulUsers.map((u) => [u.UID, u])
        );

        // Build fridge ownership map
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

  // MAIN VIEW
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
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REQUESTS TABLE VIEW
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <button
        onClick={() => setView('main')}
        className="mb-6 px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition"
      >
        Back to Worker Dashboard
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-6">Fridge Requests</h1>
      <p className="text-gray-600 mb-8">Complete your assigned fridge-related jobs.</p>

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
              {requests
                .filter((req) => req.WID === user.UID)
                .map((req) => (
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
                    <td className="px-6 py-4 font-mono">
                      {req.FID || '—'}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {/* FID Input - Delivery only*/}
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
                            ? 'bg-gray-500 hover:bg-gray-600'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {req.Status === 'Completed' ? 'Re-open' : 'Complete'}
                      </button>

                      <button
                        onClick={() => changeCondition(req.SID, req.Condition)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
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



function WorkerDashboard() {
  const { user } = useContext(UserContext);
  const [view, setView] = useState('main');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});

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

        // Fetch user profiles
        const userPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/user/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        // Fetch current FID ownership
        const trackerPromises = uniqueUIDs.map((uid) =>
          fetch(`http://localhost:5000/api/fridge_tracker/owner/${uid}`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );

        const [userResults, trackerResults] = await Promise.all([
          Promise.allSettled(userPromises),
          Promise.allSettled(trackerPromises),
        ]);

        // Build user map
        const successfulUsers = userResults
          .filter((r) => r.status === 'fulfilled' && r.value)
          .map((r) => (Array.isArray(r.value) ? r.value[0] : r.value));

        const userMap = Object.fromEntries(
          successfulUsers.map((u) => [u.UID, u])
        );

        // Build fridge ownership map
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

  // MAIN VIEW
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
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REQUESTS TABLE VIEW
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <button
        onClick={() => setView('main')}
        className="mb-6 px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition"
      >
        Back to Worker Dashboard
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-6">Fridge Requests</h1>
      <p className="text-gray-600 mb-8">Complete your assigned fridge-related jobs.</p>

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
              {requests
                .filter((req) => req.WID === user.UID)
                .map((req) => (
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
                    <td className="px-6 py-4 font-mono">
                      {req.FID || '—'}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {/* FID Input - Delivery only*/}
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
                            ? 'bg-gray-500 hover:bg-gray-600'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {req.Status === 'Completed' ? 'Re-open' : 'Complete'}
                      </button>

                      <button
                        onClick={() => changeCondition(req.SID, req.Condition)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
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
