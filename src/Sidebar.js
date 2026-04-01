import React from "react";

function Sidebar({ activePage, setPage }) {
  return (
    <div className="sidebar">
      <h2>WeCare</h2>
      <ul>
        <li className={activePage === "admin" ? "active" : ""} onClick={() => setPage("admin")}>
          Dashboard
        </li>
        <li className={activePage === "volunteers" ? "active" : ""} onClick={() => setPage("volunteers")}>
          Volunteers
        </li>
        <li className={activePage === "organizations" ? "active" : ""} onClick={() => setPage("organizations")}>
          Organizations
        </li>
        <li>Opportunities</li>
        <li>Reports</li>
        
        {/* زر تسجيل الخروج بنفس الستايل وتحت شوي */}
        <li style={{ marginTop: "60px", color: "#ff4d4d", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px" }} 
            onClick={() => {
              if(window.confirm("Are you sure you want to logout?")) setPage("home");
            }}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;