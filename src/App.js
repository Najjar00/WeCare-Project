import { useState } from "react";
import "./App.css";
import logo from "./logo.png";
import img1 from "./card 3.jpeg";
import img2 from "./card 1.jpeg";
import img3 from "./card 2.jpeg";
import AdminDashboard from "./AdminDashboard";
import AdminVolunteers from "./AdminVolunteers";
import AdminOrganizations from "./AdminOrganizations";
import Signup from "./Signup";

/* 🔥 Home Component */
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

/* 🔑 Login Component */
function Login({ goToSignup, goToAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      goToAdmin();
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="logo"><img src={logo} alt="logo" /></div>
        <div className="title">Welcome Back</div>
        <div className="subtitle">Login to continue helping others</div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <div className="link" onClick={goToSignup}>Don’t have an account? Sign Up</div>
      </div>
    </div>
  );
}

/* 🚀 Main App Component */
function App() {
  const [page, setPage] = useState("home");
  const isAdminPage = ["admin", "volunteers", "organizations"].includes(page);

  return (
    <div className={isAdminPage ? "" : "app-wrapper"}>
      {page === "home" && <Home goToSignup={() => setPage("signup")} goToLogin={() => setPage("login")} />}
      {page === "login" && <Login goToSignup={() => setPage("signup")} goToAdmin={() => setPage("admin")} />}
      {page === "signup" && <Signup goToLogin={() => setPage("login")} />}
      
      {/* صفحات الأدمن تمرر لها setPage فقط ليعمل السايد بار */}
      {page === "admin" && <AdminDashboard setPage={setPage} />}
      {page === "volunteers" && <AdminVolunteers setPage={setPage} />}
      {page === "organizations" && <AdminOrganizations setPage={setPage} />}
    </div>
  );
}

export default App;