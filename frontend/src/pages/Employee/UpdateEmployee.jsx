import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const navigate = useNavigate();

  // Fetch employee details
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${id}`
        );
        const employee = response.data;
        setEmployeeName(employee.name);
        setEmployeeEmail(employee.email);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = { name: employeeName, email: employeeEmail };
      await axios.put(
        `http://localhost:8080/api/employees/${id}`,
        updatedEmployee
      );
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] bg-white mt-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2">
          <h2 className="text-2xl font-bold text-center mb-6">
            Update Employee
          </h2>
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
                Update
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

export default UpdateEmployee;
