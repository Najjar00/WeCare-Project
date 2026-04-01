import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";

function AdminOrganizations({ setPage }) {
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/organizations")
      .then((res) => res.json())
      .then((data) => setOrganizations(data))
      .catch(() => {
        setOrganizations([
          { id: 1, name: "Hope Charity", email: "hope@charity.org", type: "Non Profit", location: "Amman", status: "Pending", description: "Providing food and shelter." },
          { id: 2, name: "Green Earth", email: "contact@greenearth.com", type: "Environmental", location: "Irbid", status: "Approved", description: "Tree planting initiatives." }
        ]);
      });
  }, []);

  const handleStatusUpdate = (id, status) => {
    const endpoint = status === "Approved" ? "approve" : "reject";
    fetch(`http://localhost:3000/admin/organizations/${id}/${endpoint}`, { method: "PUT" })
      .then(res => {
        if (res.ok) setOrganizations(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      });
  };

  const filtered = organizations.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-layout">
      <Sidebar activePage="organizations" setPage={setPage} />

      <div className="admin-main">
        <div className="admin-header">
          <h1>Organization Management</h1>
          <p>Review registration requests and manage partners</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="search-input"
            style={{ padding: '10px', width: '320px', borderRadius: '8px', border: '1px solid #ddd' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-card" style={{ marginTop: "30px", padding: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#333", borderBottom: "2px solid #f4f7f9" }}>
                <th style={{ padding: "15px" }}>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "20px 15px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "15px" }}>{org.name}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{org.email}</div>
                  </td>
                  <td style={{ fontSize: "14px" }}>{org.type}</td>
                  <td style={{ fontSize: "14px" }}>{org.location}</td>
                  <td>
                    <span className={`status-badge ${org.status.toLowerCase()}`} 
                          style={{ 
                            padding: "6px 15px", 
                            borderRadius: "15px", 
                            fontSize: "12px",
                            backgroundColor: org.status === "Pending" ? "#FEF5D9" : "#D4F4E2",
                            color: org.status === "Pending" ? "#D4A017" : "#2D8A5B"
                          }}>
                      {org.status}
                    </span>
                  </td>
                  <td style={{ width: "350px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                      
                      {/* زر التفاصيل العلوي */}
                      <button onClick={() => setSelectedOrg(org)} 
                              style={{ background: "#4A90E2", color: "white", border: "none", width: "100%", padding: "10px", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}>
                        Details
                      </button>

                      {/* الأزرار الدائرية في المنتصف */}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => handleStatusUpdate(org.id, "Approved")} 
                                style={{ background: "#2563EB", color: "white", border: "none", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          ✔
                        </button>
                        <button onClick={() => handleStatusUpdate(org.id, "Rejected")} 
                                style={{ background: "#FF4D4D", color: "white", border: "none", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          ✖
                        </button>
                      </div>

                      {/* زر الحذف السفلي */}
                      <button style={{ background: "#E75B49", color: "white", border: "none", width: "100%", padding: "10px", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}>
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal التفاصيل */}
        {selectedOrg && (
          <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <div className="modal-content" style={{ background: "white", padding: "30px", borderRadius: "15px", width: "450px" }}>
              <h3>{selectedOrg.name} Details</h3>
              <hr />
              <p style={{ marginTop: "15px" }}><strong>Description:</strong> {selectedOrg.description}</p>
              <button onClick={() => setSelectedOrg(null)} className="btn-close" style={{ marginTop: "20px", width: "100%", padding: "10px", cursor: "pointer", background: "#3A8D8B", color: "white", border: "none", borderRadius: "8px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrganizations;