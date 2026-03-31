import logo from "./logo.png";

export default function Signup({ goToLogin }) {
  return (
    <div className="container">
      <div className="card signup">

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="title">Create organization account</div>
        <div className="subtitle">Get involved in charity work</div>

        <div className="form-row">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email" />

        {/* ✅ الباسورد هون تحت الإيميل */}
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