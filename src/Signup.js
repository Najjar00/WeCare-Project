/* Signup */
import React, { useState } from "react";
import logo from "./logo.png"; // تأكد أن ملف الصورة موجود في نفس مجلد src
function Signup({ goToLogin }) {
  // 1. تعريف الـ State لكل الحقول في كائن واحد
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    orgType: "Non Profit", // القيمة الافتراضية
    location: "",
    description: "",
  });

  const [file, setFile] = useState(null); // لحفظ ملف التسجيل

  // 2. دالة لتحديث البيانات عند الكتابة في أي Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. دالة إرسال البيانات للباك ايند
  const handleSubmit = async (e) => {
    e.preventDefault();

    // فحص بسيط قبل الإرسال
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // تجهيز البيانات كـ FormData (عشان نقدر نبعت ملف + نصوص)
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    if (file) dataToSend.append("registrationDoc", file);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: dataToSend, // نرسل الـ FormData مباشرة
      });

      if (response.ok) {
        alert("Registration Successful! Please login.");
        goToLogin();
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="container">
      <div className="card signup">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="title">Create organization account</div>
        <div className="subtitle">Join and manage volunteer opportunities</div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>

          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />

          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />

          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />

          <select name="orgType" value={formData.orgType} onChange={handleChange}>
            <option value="Non Profit">Non Profit</option>
            <option value="Charity">Charity</option>
            <option value="Community Group">Community Group</option>
            <option value="Educational Institution">Educational Institution</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Religious Organization">Religious Organization</option>
            <option value="Environmental Group">Environmental Group</option>
            <option value="Other">Other</option>
          </select>

          <input type="text" name="location" placeholder="Location" onChange={handleChange} />
          <textarea name="description" placeholder="Organization Description" onChange={handleChange}></textarea>

          <label>Upload Registration Document</label>

          <div className="upload-box">
            <input 
              type="file" 
              id="fileUpload" 
              hidden 
              onChange={(e) => setFile(e.target.files[0])} 
            />
            <label htmlFor="fileUpload">
              {file ? `File: ${file.name}` : "Click to upload or drag and drop"} <br />
              <span>PDF, DOC, DOCX (Max 10MB)</span>
            </label>
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <div className="link" onClick={goToLogin}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}
export default Signup;