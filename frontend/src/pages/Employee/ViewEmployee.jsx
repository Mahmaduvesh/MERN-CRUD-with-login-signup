import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function ViewEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate back to home

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${id}`
        );
        console.log(response.data); // Log response to verify the data structure
        setEmployee(response.data);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]); // Fetch data when the ID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] bg-white mt-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2">
          <h2 className="text-2xl font-bold text-center mb-6">
            Employee Details
          </h2>
          {employee ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <p className="text-sm text-gray-700">{employee._id}</p>{" "}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee Name
                </label>
                <p className="text-sm text-gray-700">{employee.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee Email
                </label>
                <p className="text-sm text-gray-700">{employee.email}</p>
              </div>
            </div>
          ) : (
            <p>No employee data available.</p>
          )}

          {/* "Back to Home" button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/home")}
              className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;
