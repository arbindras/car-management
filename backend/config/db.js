const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to the database:", err));
