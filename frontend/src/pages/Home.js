import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FaEdit, FaEye, FaTrash, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees data from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      const data = response.data.map((employee) => ({
        id: employee.id || employee._id, // Use the appropriate key if _id is used
        name: employee.name,
        email: employee.email,
      }));
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to load employees!");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle delete employee with confirmation
  const deleteEmployee = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!isConfirmed) return; // If the user cancels, do nothing.

    if (!id) {
      toast.error("Employee ID is invalid or undefined.");
      console.warn("Attempted to delete an employee with invalid ID:", id);
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Employees List
        </h1>

        <div className="flex justify-start mb-6 md:ml-[22.5rem] ml-0">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center space-x-2"
            onClick={() => navigate("/add-employee")}
          >
            <FaUserPlus className="text-xl" />
            <span className="text-sm">Add Employee</span>
          </button>
        </div>

        <div className="overflow-x-auto max-w-screen-md mx-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border-b text-left text-gray-700">
                  Index
                </th>
                <th className="px-3 py-2 border-b text-left text-gray-700">
                  Employee Name
                </th>
                <th className="px-3 py-2 border-b text-left text-gray-700">
                  Employee Email
                </th>
                <th className="px-3 py-2 border-b text-left text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="px-3 py-2 border-b text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 border-b text-gray-700">
                      {employee.name}
                    </td>
                    <td className="px-3 py-2 border-b text-gray-700">
                      {employee.email}
                    </td>
                    <td className="px-3 py-2 border-b text-gray-700">
                      <div className="flex space-x-3">
                        <button
                          className="bg-green-500 text-white p-2 rounded-full"
                          onClick={() =>
                            navigate(`/update-employee/${employee.id}`)
                          }
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          className="bg-blue-500 text-white p-2 rounded-full"
                          onClick={() =>
                            navigate(`/view-employee/${employee.id}`)
                          }
                        >
                          <FaEye className="text-xl" />
                        </button>

                        <button
                          className="bg-red-500 text-white p-2 rounded-full"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-700">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
