import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import UpdateEmployee from "./pages/Employee/UpdateEmployee";
import ViewEmployee from "./pages/Employee/ViewEmployee";
import AddEmployee from "./pages/Employee/AddEmployee";
import { ToastContainer } from "react-toastify";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Revalidate authentication on route change
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-employee/:id"
          element={
            <PrivateRoute>
              <ViewEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-employee/:id"
          element={
            <PrivateRoute>
              <UpdateEmployee />
            </PrivateRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
