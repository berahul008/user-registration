const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/register",
      req.body
    );
    res.json({ success: true, ...response.data });
  } catch (error) {
    res.json({
      success: false,
      message: error.response?.data?.message || "Registration failed"
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    await axios.post("http://localhost:8080/api/users/login", req.body);
    res.json({ success: true });
  } catch {
    res.json({ success: false, message: "Login failed" });
  }
});

app.get("/users", async (req, res) => {
  const response = await axios.get("http://localhost:8080/api/users/all");
  res.json(response.data);
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
  await axios.delete(
    `http://localhost:8080/api/users/${req.params.id}`
  );
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

