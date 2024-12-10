const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API Endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Register endpoint
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(query, [username, email, password], function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ error: "Username already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({ id: this.lastID, username, email });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ id: row.id, username: row.username, email: row.email });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
