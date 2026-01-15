const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Call Spring Boot backend
    const response = await axios.post(
      "http://localhost:8080/api/users/register",
      { username, email }
    );

    // Debug / info response
    res.json({
      message: "User registered successfully",
      database: "MySQL",
      table: "users",
      query: "INSERT INTO users (username, email) VALUES (?, ?);",
      username: response.data.username,
      email: response.data.email
    });

  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});
