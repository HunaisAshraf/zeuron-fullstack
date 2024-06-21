const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("category.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL, 
      FOREIGN KEY (user_id) REFERENCES users (id));`);
  });
  
  module.exports = db;