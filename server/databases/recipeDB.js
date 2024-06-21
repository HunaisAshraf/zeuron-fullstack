const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("recipes.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT UNIQUE NOT NULL,
    ingredient TEXT NOT NULL,
    image TEXT NOT NULL,
    user_id TEXT NOT NULL, 
    category_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id));`);
});

module.exports = db;
