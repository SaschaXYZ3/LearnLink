const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../databases/user.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  // drop the old users table
  db.run("DROP TABLE IF EXISTS users");
  
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT,
      password TEXT,
      role TEXT DEFAULT 'student',
      birthDate TEXT
    )
  `);
});

module.exports = db;
