import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    console.log(role);
 
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
      .catch((error) => console.error("Error:", error));
  }
 
  // Color map - Tailwind
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
  <div className="px-6 py-10 sm:pl-12">
    <h2 className={`text-3xl font-bold ${c.text} mb-4`}>Sign Up</h2>
    <p className="text-gray-600 max-w-2xl mb-4">{description}</p>
 
    <label className="block mb-2 font-medium">Select your role:</label>
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
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
      <>
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
 
        <label className="block mb-2 font-medium">Dorm</label>
        <input
          type="text"
          value={dorm}
          onChange={(e) => setDorm(e.target.value)}
          placeholder="Enter your dorm building"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
 
        <label className="block mb-2 font-medium">Room number</label>
        <input
          type="text"
          value={roomnum}
          onChange={(e) => setRoomNum(e.target.value)}
          placeholder="Enter your room number"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </>
    )}
 
    <button
      type="submit"
      onClick={handleSubmission}
      className={`ml-4 px-5 py-2 text-white font-semibold rounded-lg shadow-md transition ${c.bg} ${c.hover}`}
    >
      Sign Up
    </button>
  </div>
  )
}

// Sign-in page
function SignInPage({ title, color, description, dashboardPath }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const colorMap = {
    blue: { text: "text-blue-700", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
    green: { text: "text-green-700", bg: "bg-green-600", hover: "hover:bg-green-700" },
    purple: { text: "text-purple-700", bg: "bg-purple-600", hover: "hover:bg-purple-700" },
    amber: { text: "text-amber-700", bg: "bg-amber-600", hover: "hover:bg-amber-700" },
  };

  const c = colorMap[color] || colorMap.blue;

  const handleSignIn = () => {
  // Basic mock logic for redirecting based on username
  const user = username.toLowerCase();

  if (user === "s") navigate("/student/dashboard");
  else if (user === "w") navigate("/worker/dashboard");
  else if (user === "l") navigate("/liaison/dashboard");
  else if (user === "c") navigate("/campusHousing/dashboard");
  else alert("Unknown username.");
  };

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
        <label htmlFor="usernameInput" className="block mb-2 font-medium">
          Enter your username:
        </label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
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
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    requestDate: "",
    serviceDate: "",
    deadlineDate: "",
    condition: "Clean",
    preferredTimes: "",
    notes: "",
  });

  // Set requestDate to today's date automatically
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, requestDate: today }));
  }, []);

  const resetForm = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      requestDate: today,
      serviceDate: "",
      deadlineDate: "",
      condition: "Clean",
      preferredTimes: "",
      notes: "",
    });
  };

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      typeOfService: formType,
      requestDate: formData.requestDate,
      serviceDate: formData.serviceDate,
      deadlineDate: formData.deadlineDate || null,
      condition: formData.condition,
      preferredTimes: formData.preferredTimes
        ? formData.preferredTimes.split(",").map((t) => t.trim())
        : [],
      notes: formData.notes,
    };

    console.log("Submitted:", payload);
    alert(`${formType} request submitted!`);

    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] px-6 py-10">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">
          Student Dashboard
        </h2>
        <p className="text-gray-600 mb-8">
          Submit a request for your housing services below.
        </p>

        {/* Show cards only when form is NOT open */}
        {!showForm && (
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {/* Pickup Card */}
            <div className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                Request Pickup
              </h3>
              <p className="text-gray-600 mb-4">
                Schedule a pickup for your fridge or other housing items.
              </p>
              <button
                onClick={() => handleOpenForm("Pickup")}
                className="px-5 py-2 !bg-blue-600 !text-white !rounded-lg font-semibold !hover:bg-blue-700 transition"
              >
                Request Pickup
              </button>
            </div>

            {/* Maintenance Card */}
            <div className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                Request Maintenance
              </h3>
              <p className="text-gray-600 mb-4">
                Report issues with your fridge or housing equipment.
              </p>
              <button
                onClick={() => handleOpenForm("Maintenance")}
                className="px-5 py-2 !bg-blue-600 !text-white !rounded-lg font-semibold !hover:bg-blue-700 transition"
              >
                Request Maintenance
              </button>
            </div>

            {/* Delivery Card */}
            <div className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                Request Delivery
              </h3>
              <p className="text-gray-600 mb-4">
                Schedule delivery of your assigned fridge or housing item.
              </p>
              <button
                onClick={() => handleOpenForm("Delivery")}
                className="px-5 py-2 !bg-blue-600 !text-white !rounded-lg font-semibold !hover:bg-blue-700 transition"
              >
                Request Delivery
              </button>
            </div>
          </div>
        )}

        {/* Show form only when a service is selected */}
        {showForm && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 text-left">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              {formType} Request Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type of Service */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Type of Service
                </label>
                <input
                  type="text"
                  value={formType}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Request Date - made to be current day */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Request Date
                </label>
                <input
                  type="date"
                  name="requestDate"
                  value={formData.requestDate}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Service Date */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Service Date
                </label>
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Deadline Date */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Deadline Date (optional)
                </label>
                <input
                  type="date"
                  name="deadlineDate"
                  value={formData.deadlineDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Clean">Clean</option>
                  <option value="Dirty">Dirty</option>
                </select>
              </div>

              {/* Preferred Times */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Preferred Times
                </label>
                <input
                  type="text"
                  name="preferredTimes"
                  value={formData.preferredTimes}
                  onChange={handleChange}
                  placeholder="e.g., 9AM-11AM, 1PM-3PM"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  maxLength={250}
                  placeholder="Additional notes (max 250 characters)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-lg !bg-gray-200 !text-gray-700 font-semibold !hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg !bg-blue-600 !text-white font-semibold !hover:bg-blue-700 transition"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkerDashboard() {
  const cards = [
    {
      title: "Log Hours",
      desc: "Record your work hours for payroll and tracking.",
      action: () => alert("Open Log Hours form"),
    },
    {
      title: "Log Dirty Fridge",
      desc: "Report a fridge that needs cleaning or removal.",
      action: () => alert("Open Dirty Fridge form"),
    },
    {
      title: "Fridge Scanner (Coming Soon)",
      desc: "Scan fridge barcodes to update inventory instantly.",
      action: () => alert("Scanner feature coming soon"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
    <div className="px-6 py-10 sm:pl-12">
      <h2 className="text-4xl font-bold text-green-700 mb-6">
        Worker Dashboard
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
              className="px-5 py-2 !bg-green-600 !text-white rounded-lg !hover:bg-green-700 transition"
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

function LiaisonDashboard() {
  const cards = [
    {
      title: "Schools Dashboard",
      desc: "View maintenance requests, deadlines, and fridge assignments.",
      action: () => alert("View Schools Dashboard"),
    },
    {
      title: "Worker Metrics",
      desc: "Track worker hours, payment status, and task performance.",
      action: () => alert("View Worker Metrics"),
    },
    {
      title: "Generate Reports",
      desc: "Export summarized performance and maintenance data.",
      action: () => alert("Generate Reports"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
    <div className="px-6 py-10 sm:pl-12">
      <h2 className="text-4xl font-bold text-purple-700 mb-6">
        Liaison Dashboard
      </h2>
      <p className="text-gray-600 mb-8">
        Manage school metrics and worker activity.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600 mb-5">{card.desc}</p>
            <button
              onClick={card.action}
              className="px-5 py-2 !bg-purple-600 !text-white rounded-lg !hover:bg-purple-700 transition"
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

function CampusHousingDashboard() {
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
          Test App
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
  );
}

export default App;
