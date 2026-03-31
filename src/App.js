import { useState } from "react";
import "./App.css";
import logo from "./logo.png";
import img1 from "./card 3.jpeg";
import img2 from "./card 1.jpeg";
import img3 from "./card 2.jpeg";
import AdminDashboard from "./AdminDashboard";
import AdminVolunteers from "./AdminVolunteers";

/* 🔥 Home */
function Home({ goToSignup, goToLogin }) {
  return (
    <div className="container">
      <div className="card home">
        <div className="home-images">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
        </div>

        <div className="title">Let’s Get Started</div>
        <div className="subtitle">
          Volunteer for good causes and make a difference. Join and support the community today.
        </div>

        <button onClick={goToSignup}>Join Now</button>

        <div className="link" onClick={goToLogin}>
          Already have an account? <b>Login</b>
        </div>
      </div>
    </div>
  );
}

/* Login */
function Login({ goToSignup, goToAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    if (email === adminEmail && password === adminPassword) {
      goToAdmin();
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="title">Welcome Back</div>
        <div className="subtitle">Login to continue helping others</div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <div className="link" onClick={goToSignup}>
          Don’t have an account? Sign Up
        </div>
      </div>
    </div>
  );
}

/* Signup */
function Signup({ goToLogin }) {
  return (
    <div className="container">
      <div className="card signup">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="title">Create organization account</div>
        <div className="subtitle">Join and manage volunteer opportunities</div>

        <div className="form-row">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <input type="text" placeholder="Phone Number" />

        <select>
          <option>Organization Type</option>
          <option>Non Profit</option>
          <option>Charity</option>
          <option>Community Group</option>
          <option>Educational Institution</option>
          <option>Healthcare</option>
          <option>Religious Organization</option>
          <option>Environmental Group</option>
          <option>Other</option>
        </select>

        <input type="text" placeholder="Location" />
        <textarea placeholder="Organization Description"></textarea>

        <label>Upload Registration Document</label>

        <div className="upload-box">
          <input type="file" id="fileUpload" hidden />
          <label htmlFor="fileUpload">
            Click to upload or drag and drop <br />
            <span>PDF, DOC, DOCX (Max 10MB)</span>
          </label>
        </div>

        <button>Sign Up</button>

        <div className="link" onClick={goToLogin}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}

/* App */
function App() {
  const [page, setPage] = useState("home");

  return (
    <div className={page === "admin" || page === "volunteers" ? "" : "app-wrapper"}>
      {page === "home" && (
        <Home
          goToSignup={() => setPage("signup")}
          goToLogin={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          goToAdmin={() => setPage("admin")}
        />
      )}

      {page === "signup" && (
        <Signup goToLogin={() => setPage("login")} />
      )}

      {page === "admin" && (
        <AdminDashboard goToVolunteers={() => setPage("volunteers")} />
      )}

      {page === "volunteers" && <AdminVolunteers />}
    </div>
  );
}

export default App;