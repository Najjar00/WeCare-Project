import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);