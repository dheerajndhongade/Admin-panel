const Employee = require("../models/Employee");
const path = require("path");
const fs = require("fs");

const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;

    // Check if file exists
    const img = req.file ? req.file.path : null;

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new employee
    const newEmployee = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      img,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createEmployee };
