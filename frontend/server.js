const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", async (req, res) => {
  const { username, email } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/register",
      { username, email }
    );

    res.json({
      success: true,
      database: "MySQL",
      table: "users",
      query: "INSERT INTO users (username, email) VALUES (?, ?);",
      username: response.data.username,
      email: response.data.email
    });

  } catch (error) {

    if (error.response && error.response.data) {
      res.json({
        success: false,
        message: error.response.data.message
      });
    } else {
      res.json({
        success: false,
        message: "Duplicate entry. User already exists in the system."
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});

