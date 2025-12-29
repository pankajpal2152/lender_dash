import React, { useState } from "react";
import "./CreateUser.css";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "User", // default value
    aggregatorId: "",
    lenderId: "",
    fieldEngineerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    alert("User Created! Check console for data.");
    // Here you can call your API to save user
  };

  return (
    <div className="create-user-container">
      <h1>Create User</h1>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label> 
            ID 
            </label>
          <input
            type="text"
            name="ID"
            value={formData.Id}
            onChange={handleChange}
            placeholder="Enter ID"
          />
          
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-group">
          <label>User Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="FieldEngineer">Field Engineer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Aggregator ID </label>
          <input
            type="text"
            name="aggregatorId"
            value={formData.aggregatorId}
            onChange={handleChange}
            placeholder="Enter Aggregator UUID"
          />
        </div>

        <div className="form-group">
          <label>Lender ID </label>
          <input
            type="text"
            name="lenderId"
            value={formData.lenderId}
            onChange={handleChange}
            placeholder="Enter Lender UUID"
          />
        </div>

        <div className="form-group">
          <label>Field Engineer ID </label>
          <input
            type="text"
            name="fieldEngineerId"
            value={formData.fieldEngineerId}
            onChange={handleChange}
            placeholder="Enter Field Engineer UUID"
          />
        </div>

        <button type="submit" className="submit-btn">
          Create User
        </button>
      </form>
    </div>
  );
}
