import React from "react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar"; // استيراد السايد بار الموحد

function AdminDashboard({ setPage }) {
  return (
    <div className="admin-layout">
      {/* السايد بار الموحد - نمرر له الصفحة الحالية ودالة تغيير الصفحات */}
      <Sidebar activePage="admin" setPage={setPage} />

      <div className="admin-main">
        {/* الهيدر الخاص باللوحة */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's an overview of WeCare platform activities.</p>
        </div>

        {/* كروت الإحصائيات - Stats Cards */}
        <div className="stats">
          <div className="stat-card">
            <h3>Total Volunteers</h3>
            <p>1,240</p>
            <span style={{color: '#5BAF8F', fontSize: '12px'}}>+12% from last month</span>
          </div>
          <div className="stat-card">
            <h3>Active Organizations</h3>
            <p>45</p>
            <span style={{color: '#5BAF8F', fontSize: '12px'}}>+5 new this week</span>
          </div>
          <div className="stat-card">
            <h3>Open Opportunities</h3>
            <p>12</p>
            <span style={{color: '#3A8D8B', fontSize: '12px'}}>Active now</span>
          </div>
        </div>

        {/* قسم الرسم البياني - Engagement Chart */}
        <div className="chart-card">
          <h2>Volunteer Engagement</h2>
          <p style={{color: '#777', fontSize: '14px'}}>Weekly activity overview</p>
          <div className="chart">
            <div className="bar" style={{ height: "60%" }} title="Mon"></div>
            <div className="bar" style={{ height: "85%" }} title="Tue"></div>
            <div className="bar" style={{ height: "45%" }} title="Wed"></div>
            <div className="bar" style={{ height: "95%" }} title="Thu"></div>
            <div className="bar" style={{ height: "70%" }} title="Fri"></div>
            <div className="bar" style={{ height: "55%" }} title="Sat"></div>
            <div className="bar" style={{ height: "30%" }} title="Sun"></div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10px', color: '#777', fontSize: '12px'}}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* قسم النشاطات الأخيرة - Recent Activity */}
        <div className="tables" style={{gridTemplateColumns: '1fr'}}>
            <div className="table-card">
              <h2>Recent System Updates</h2>
              <ul>
                <li>✅ New organization "Hope Charity" approved.</li>
                <li>👤 15 new volunteers joined in the last 24 hours.</li>
                <li>📢 New opportunity "Beach Cleanup" posted by Green Earth.</li>
                <li>🛠️ System maintenance scheduled for next Sunday.</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;