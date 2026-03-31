import { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

  // 1. Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:3000/admin/volunteers")
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
      })
      .catch(() => {
        /* mock data في حال فشل الاتصال */
        const mockVolunteers = [
          {
            id: 1,
            name: "Ahmad Ali",
            email: "ahmad@gmail.com",
            created: "2024-02-10",
            status: "Active",
          },
          {
            id: 2,
            name: "Sara Khaled",
            email: "sara@gmail.com",
            created: "2024-02-11",
            status: "Active",
          },
          {
            id: 3,
            name: "Omar Hasan",
            email: "omar@gmail.com",
            created: "2024-02-12",
            status: "Deactivated",
          },
        ];
        setVolunteers(mockVolunteers);
      });
  }, []);

  // --- وظائف الباك ايند الجديدة ---

  // 2. دالة تغيير الحالة (Activate / Deactivate)
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:3000/admin/users/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (res.ok) {
          // تحديث الحالة في الـ State فوراً
          setVolunteers((prev) =>
            prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
          );
        }
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  // 3. دالة الحذف
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      fetch(`http://localhost:3000/admin/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // إزالة المتطوع من الـ State فوراً
            setVolunteers((prev) => prev.filter((v) => v.id !== id));
          }
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  /* search filter */
  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>WeCare</h2>
        <ul>
          <li>Dashboard</li>
          <li className="active">Volunteers</li>
          <li>Organizations</li>
          <li>Opportunities</li>
          <li>Reports</li>
        </ul>
      </div>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>Manage Volunteers</h1>
          <p>Approve and manage volunteer accounts</p>
        </div>

        {/* Search */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Search volunteer by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        {/* Table */}
        <div className="table-card" style={{ marginTop: "25px" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVolunteers.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.created}</td>
                  <td>{v.status}</td>

                  <td>
                    {/* زر التفعيل */}
                    <button
                      onClick={() => handleStatusChange(v.id, "Active")}
                      style={{
                        marginRight: "8px",
                        background: "#3A8D8B",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Activate
                    </button>

                    {/* زر إلغاء التفعيل */}
                    <button
                      onClick={() => handleStatusChange(v.id, "Deactivated")}
                      style={{
                        marginRight: "8px",
                        background: "#f0ad4e",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Deactivate
                    </button>

                    {/* زر الحذف */}
                    <button
                      onClick={() => handleDelete(v.id)}
                      style={{
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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