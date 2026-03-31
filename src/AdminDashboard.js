import { useState, useEffect } from "react";
import "./AdminDashboard.css";


function AdminDashboard({ goToVolunteers }) {

  /* stats state */
  const [stats, setStats] = useState({
    volunteers: 0,
    organizations: 0,
    opportunities: 0
  });

  /* activities */
  const [activities, setActivities] = useState([]);

  /* pending organizations */
  const [pendingOrgs, setPendingOrgs] = useState([]);

  useEffect(() => {

    /* محاولة جلب البيانات من الباك اند */
    fetch("http://localhost:3000/admin/dashboard")
      .then(res => res.json())
      .then(data => {

        if (data) {

          setStats({
            volunteers: data.volunteers,
            organizations: data.organizations,
            opportunities: data.opportunities
          });

        }

      })
      .catch(() => {

        /* mock data إذا الباك اند غير شغال */

        const mockStats = {
          volunteers: 124,
          organizations: 38,
          opportunities: 56
        };

        const mockActivities = [
          "New organization registered",
          "Volunteer joined opportunity",
          "New opportunity created",
          "Organization profile updated"
        ];

        const mockPending = [
          { name: "Green Earth", status: "Pending" },
          { name: "Hope Charity", status: "Pending" },
          { name: "Community Care", status: "Pending" }
        ];

        setStats(mockStats);
        setActivities(mockActivities);
        setPendingOrgs(mockPending);

      });

  }, []);

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>WeCare</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li onClick={goToVolunteers}>Volunteers</li>
          <li>Organizations</li>
          <li>Opportunities</li>
          <li>Reports</li>
        </ul>
      </div>

      {/* Main */}
      <div className="admin-main">

        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Platform overview</p>
        </div>

        {/* Stats */}
        <div className="stats">

          <div className="stat-card">
            <h3>👤 Volunteers</h3>
            <p>{stats.volunteers}</p>
          </div>

          <div className="stat-card">
            <h3>🏢 Organizations</h3>
            <p>{stats.organizations}</p>
          </div>

          <div className="stat-card">
            <h3>📌 Opportunities</h3>
            <p>{stats.opportunities}</p>
          </div>

        </div>

        {/* Graph */}
        <div className="chart-card">
          <h2>Volunteer Growth</h2>

          <div className="chart">
            <div className="bar" style={{height:"40%"}}></div>
            <div className="bar" style={{height:"60%"}}></div>
            <div className="bar" style={{height:"75%"}}></div>
            <div className="bar" style={{height:"55%"}}></div>
            <div className="bar" style={{height:"90%"}}></div>
            <div className="bar" style={{height:"70%"}}></div>
          </div>

        </div>

        {/* Tables */}
        <div className="tables">

          <div className="table-card">
            <h2>Recent Activity</h2>

            <ul>
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>

          </div>

          <div className="table-card">
            <h2>Pending Organizations</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {pendingOrgs.map((org, index) => (
                  <tr key={index}>
                    <td>{org.name}</td>
                    <td>{org.status}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;