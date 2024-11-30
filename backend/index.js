require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./Routes/employeeRoutes");
const AuthRouter = require("./Routes/AuthRouter");

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "X-Total-Count",
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Database connection
require("./Models/db");

// Test route
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/auth", AuthRouter);

// Employee routes
app.use("/api/employees", employeeRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
