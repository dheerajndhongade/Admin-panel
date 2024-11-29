const Employee = require("../models/Employee");

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err });
  }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employee", error: err });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;
  const newEmployee = new Employee({
    name,
    email,
    mobile,
    designation,
    gender,
    courses,
    img: req.file ? req.file.filename : null, // Image handling with multer
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: "Error creating employee", error: err });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, designation, gender, courses },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: "Error updating employee", error: err });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
