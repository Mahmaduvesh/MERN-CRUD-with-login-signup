const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/employeeController");

const router = express.Router();

// Get all employees
router.get("/", getAllEmployees);

// Get an employee by ID
router.get("/:id", getEmployeeById);

// Create a new employee
router.post("/", createEmployee);

// Update an employee
router.put("/:id", updateEmployee);

// Delete an employee
router.delete("/:id", deleteEmployee);

module.exports = router;
