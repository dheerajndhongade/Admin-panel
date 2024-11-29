import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeId } = useParams(); // Get employeeId from route params (if you're using params in the URL)

  const { employee } = location.state || {}; // Get employee data if passed from navigate (for editing)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    courses: "",
    img: "",
  });

  // Fetch employee data if not passed via navigate
  useEffect(() => {
    if (employeeId) {
      // If we're editing an employee, fetch the data based on employeeId
      fetch(`http://localhost:5000/api/employees/${employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            gender: data.gender,
            designation: data.designation,
            courses: data.courses.join(", "), // Assuming courses is an array
            img: data.img,
          });
        })
        .catch((error) => {
          console.error("Error fetching employee data", error);
        });
    } else if (employee) {
      // If employee data is passed via navigate (for editing)
      setFormData({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        gender: employee.gender,
        designation: employee.designation,
        courses: employee.courses.join(", "), // Assuming courses is an array
        img: employee.img,
      });
    }
  }, [employeeId, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeId) {
        // Update employee logic here (PUT request)
        await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new employee logic here (POST request)
        await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      navigate("/"); // Redirect to the employee list after submitting
    } catch (error) {
      console.error("Error saving employee data", error);
    }
  };

  return (
    <div>
      <h2>{employeeId ? "Edit Employee" : "Create Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="courses"
          value={formData.courses}
          onChange={(e) =>
            handleChange({
              target: { name: "courses", value: e.target.value.split(", ") },
            })
          }
          placeholder="Courses (comma separated)"
        />
        <input
          type="file"
          name="img"
          onChange={(e) =>
            handleChange({
              target: { name: "img", value: e.target.files[0].name },
            })
          }
        />
        <button type="submit">
          {employeeId ? "Save Changes" : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
