import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setAdminName(decodedToken.username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <button onClick={() => navigate("/home")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/employees")}>
              Employee List
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-message">
          <h1>Welcome to the Admin Panel</h1>
          <h2>Hello, {adminName}</h2>
        </div>
        <div className="button-container">
          <button onClick={() => navigate("/create-employee")}>
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
