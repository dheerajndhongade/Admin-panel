import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the employee ID from the URL params
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    img: null,
  });

  useEffect(() => {
    // Fetch employee data based on ID
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${id}`
        );
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEmployeeData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      img: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("designation", employeeData.designation);
    formData.append("gender", employeeData.gender);
    formData.append("courses", JSON.stringify(employeeData.courses));
    formData.append("img", employeeData.img);

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Employee updated successfully!");
        navigate("/employees");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* The form inputs will be similar to the ones in CreateEmployee */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
        />
      </div>
      {/* ... other form fields ... */}
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
