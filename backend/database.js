const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:"); // Use ':memory:' for an in-memory DB, or 'users.db' for a persistent file.

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT,
      password TEXT
    )
  `);
});

module.exports = db;
