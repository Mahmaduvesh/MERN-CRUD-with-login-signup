import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddEmployee() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, check if employee already exists by email
      const response = await axios.get("http://localhost:8080/api/employees");
      const existingEmployee = response.data.find(
        (employee) => employee.email === employeeEmail
      );

      if (existingEmployee) {
        toast.error("Employee with this email already exists!");
        return; // Prevent submission if employee exists
      }

      // Proceed with adding employee if not exists
      await axios.post("http://localhost:8080/api/employees", {
        name: employeeName,
        email: employeeEmail,
      });

      toast.success("Employee added successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Error adding employee: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] bg-white mt-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2">
          <h2 className="text-2xl font-bold text-center mb-6">Add Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="employeeName"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="employeeEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Email
              </label>
              <input
                type="email"
                id="employeeEmail"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-start space-x-4">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
