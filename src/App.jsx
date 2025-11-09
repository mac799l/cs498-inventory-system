import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Home display
function Home() {
  return (
    <div className="px-6 py-10 text-center sm:text-left sm:pl-12">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Home Menu</h1>
      <p className="text-gray-700 max-w-xl mx-auto sm:mx-0">
        Choose your role to access your dashboard or sign up below.
      </p>
      <br/>
      <button
        className={`ml-4 px-5 py-2 text-blue-800 font-semibold rounded-lg shadow-md transition bg-blue-600 hover:bg-blue-700`}
        onClick={() => alert(`*Bring up sign up form*`)}
      >
        Sign Up
      </button>
    </div>
  );
}

//Dashboard for each user
function Dashboard({ title, color, description }) {
  //Credential is entry into textbox, functions for it
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

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
      <h2 className={`text-3xl font-bold ${c.text} mb-4`}>{title}</h2>
      <p className="text-gray-600 max-w-2xl mb-4">{description}</p>

      <label htmlFor="usernameInput" className="block mb-2 font-medium">
        Enter your username:
      </label>
      <input
        type="text"
        id="usernameInput"
        value={username}
        onChange={handleChangeUsername}
        placeholder="Enter your Username"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <br/>
      <br/>
      <label htmlFor="passwordInput" className="block mb-2 font-medium">
        Enter your password:
      </label>
      <input
        type="password"
        id="passwordInput"
        value={password}
        onChange={handleChangePassword}
        placeholder="Enter your password"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <br/>
      <br/>
      {/* This is the function that takes the sign in values - edit to reference database of sign-ins */}
      <button
        className={`ml-4 px-5 py-2 text-blue-800 font-semibold rounded-lg shadow-md transition ${c.bg} ${c.hover}`}
        onClick={() => alert(`Sign in test: ${username}, ${password}, ${title}`)}
      >
        Sign In
      </button>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { path: "/student", color: "blue", label: "Student" },
    { path: "/worker", color: "green", label: "Worker" },
    { path: "/liaison", color: "purple", label: "Liaison" },
    { path: "/campusHousing", color: "amber", label: "Campus Housing" },
  ];

  // Color map for each section's text
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
          {/* Dropdown menu for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden bg-white text-blue-800 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          {/* Home Button */}
          <Link to="/">
            <button className="hidden sm:inline-block bg-white text-blue-800 font-semibold px-3 py-1 rounded-md shadow hover:bg-blue-50 transition">
              Home
            </button>
          </Link>
        </div>

        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
          Test App
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4">
          {menuItems.map(({ path, color, label }) => (
            <Link key={path} to={path}>
              <button
                className={`px-4 py-2 text-blue-800 font-semibold rounded-lg shadow transition ${colorMap[color]}`}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>

        {/* Spacer for alignment */}
        <div className="w-10 sm:w-0" />

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 flex flex-col items-center py-4 space-y-3 sm:hidden shadow-md z-50">
            {menuItems.map(({ path, color, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="w-4/5"
              >
                <button
                  className={`w-full py-2 rounded-md font-semibold text-blue-800 shadow transition ${colorMap[color]}`}
                >
                  {label} Portal
                </button>
              </Link>
            ))}
        </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/student"
            element={
              <Dashboard
                title="Student Dashboard"
                color="blue"
                description="Manage your account, schedule deliveries, and track fridge condition." />
            }
          />
          <Route
            path="/worker"
            element={
              <Dashboard
                title="Worker Dashboard"
                color="green"
                description="View assigned tasks, log completed work, and track your hours."
              />
            }
          />
          <Route
            path="/liaison"
            element={
              <Dashboard
                title="Liaison Dashboard"
                color="purple"
                description="Monitor operations, manage room assignments, and handle requests."
              />
            }
          />
          <Route
            path="/campusHousing"
            element={
              <Dashboard
                title="Campus Housing Dashboard"
                color="amber"
                description="View system-wide data and manage fridge replacement logistics."
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
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
