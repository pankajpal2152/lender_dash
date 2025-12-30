import React, { useState } from "react";
import "./CreateUser.css";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sign In Data:", formData);
    alert("Signed in successfully!");

  };

  return (
    <div className="create-user-container">
      <h1>Sign In</h1>

      <form className="create-user-form" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* SUBMIT */}
        <button type="submit" className="submit-btn">
          Create User
        </button>
      </form>
    </div>
  );
}
