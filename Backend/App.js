const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./Config/Database");

const surveyRoutes = require("./Routes/surveyRoutes");
const questionRoutes = require("./Routes/questionRoutes");
const responseRoutes = require("./Routes/responseRoutes");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

app.use("/api/surveys", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Survey and Feedback App API",
  });
});

const startServer = async () => {
  const dbReady = await connectDB();

  if (!dbReady) {
    console.error("Database connection failed.");
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

module.exports = app;