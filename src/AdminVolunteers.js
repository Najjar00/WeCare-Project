import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";

function AdminVolunteers({ setPage }) {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/admin/volunteers")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch(() => {
        // بيانات تجريبية مطابقة للصورة
        setVolunteers([
          { id: 1, name: "Ahmad Ali", email: "ahmad@gmail.com", created: "2024-02-10", status: "Active" },
          { id: 2, name: "Sara Khaled", email: "sara@gmail.com", created: "2024-02-11", status: "Active" },
          { id: 3, name: "Omar Hasan", email: "omar@gmail.com", created: "2024-02-12", status: "Deactivated" }
        ]);
      });
  }, []);

  const filtered = volunteers.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-layout">
      <Sidebar activePage="volunteers" setPage={setPage} />

      <div className="admin-main">
        <div className="admin-header">
          <h1>Manage Volunteers</h1>
          <p>Approve and manage volunteer accounts</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input 
            type="text" 
            placeholder="Search volunteer by name or email..." 
            className="search-input"
            style={{ padding: '10px', width: '300px', borderRadius: '8px', border: '1px solid #ddd' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-card" style={{ marginTop: "25px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.created}</td>
                  <td>{v.status}</td>
                  <td style={{ width: "250px" }}>
                    {/* الأزرار فوق بعض كما في الصورة */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px" }}>
                      <button style={{ background: "#438E8C", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" }}>Activate</button>
                      <button style={{ background: "#F1B45C", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" }}>Deactivate</button>
                      <button style={{ background: "#E75B49", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminVolunteers;