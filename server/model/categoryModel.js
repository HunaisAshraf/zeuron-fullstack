const db = require("../databases/categoryDB");

const addCategory = (category, user_id, callback) => {
  db.run(
    "INSERT INTO categories (category, user_id) VALUES(?,?)",
    [category, user_id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID, category, user_id });
    }
  );
};

const getAllCategory = (user_id, callback) => {
  db.all(
    "SELECT * FROM categories WHERE user_id = ?",
    [user_id],
    function (err, row) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, row);
    }
  );
};

module.exports = { addCategory,getAllCategory };
