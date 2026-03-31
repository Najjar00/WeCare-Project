import { useState } from "react";
import logo from "./logo.png";

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

        {/* زر تسجيل الدخول */}
        <button onClick={handleLogin}>Login</button>

        {/* زر الذهاب للتسجيل */}
        <div className="link" onClick={goToSignup}>
          Don’t have an account? Sign Up
        </div>

      </div>
    </div>
  );
}

export default Login;