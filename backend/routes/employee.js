const express = require("express");
const multer = require("multer");
const employeeController = require("../controllers/employeeController");
const path = require("path"); // <-- Add this line

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload images to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique file names
  },
});

const upload = multer({ storage });

// Create Employee route
router.post("/create", upload.single("img"), employeeController.createEmployee);

module.exports = router;
