const express = require("express");
const multer = require("multer");
const path = require("path");
const employeeController = require("../controllers/employeeController");

// Multer setup for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Routes
router.get("/api/employees", employeeController.getEmployees);
router.get("/api/employees/:id", employeeController.getEmployeeById);
router.post(
  "/api/employees/create",
  upload.single("img"),
  employeeController.createEmployee
);
router.put("/api/employees/:id", employeeController.updateEmployee);
router.delete("/api/employees/:id", employeeController.deleteEmployee);

module.exports = router;
