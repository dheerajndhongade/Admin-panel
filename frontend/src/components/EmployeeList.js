import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const EmployeeList = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State to hold filtered employees

  // Fetch employee data from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initially, show all employees
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredEmployees(employees); // Show all employees if no search query
    } else {
      setFilteredEmployees(
        employees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.mobile.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, employees]);

  // Delete employee function
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
      setFilteredEmployees(
        filteredEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  // Handle editing employee - redirect to edit page with employee data
  const handleEdit = (employee) => {
    navigate("/employees/edit", {
      state: { employee }, // Pass employee data to the edit page
    });
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <div style={navbarStyle}>
        <h1 style={{ margin: 0, color: "#fff" }}>Employee Management</h1>
      </div>

      {/* Search Bar */}
      <div style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search by Name, Email, or Mobile"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Employee List */}
      <div style={employeeListStyle}>
        <h2>Total Employees: {filteredEmployees.length}</h2>
        <div style={gridStyle}>
          {filteredEmployees.map((employee) => (
            <div style={cardStyle} key={employee._id}>
              <img
                src={`http://localhost:5000/uploads/${employee.img}`}
                alt="Employee"
                style={imageStyle}
              />
              <div style={cardContentStyle}>
                <h3>{employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Mobile: {employee.mobile}</p>
                <p>Designation: {employee.designation}</p>
                <p>Gender: {employee.gender}</p>
                <p>Courses: {employee.courses.join(", ")}</p>
                <p>
                  Created At:{" "}
                  {new Date(employee.createdAt).toLocaleDateString()}
                </p>
                <div style={buttonContainerStyle}>
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styling for the components
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh", // Ensure the form takes the entire height of the screen
};

const navbarStyle = {
  backgroundColor: "#1976d2",
  padding: "20px",
  textAlign: "center",
  flexShrink: 0, // Prevent navbar from shrinking
};

const searchBarStyle = {
  padding: "10px 20px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};

const inputStyle = {
  width: "50%",
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const employeeListStyle = {
  padding: "20px",
  flexGrow: 1, // Make the employee list take up remaining space
  overflowY: "auto", // Make the list scrollable
  height: "calc(100vh - 80px)", // Full height minus navbar height
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "15px",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  borderRadius: "50%",
};

const cardContentStyle = {
  marginTop: "15px",
};

const buttonContainerStyle = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-around",
};

const editButtonStyle = {
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  cursor: "pointer",
};

export default EmployeeList;
