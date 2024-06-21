const db = require("../databases/usersDB");

const createUser = (name, email, password, callback) => {
  db.run(
    `INSERT INTO users (name, email, password) VALUES(?,?,?)`,
    [name, email, password],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID, name, email });
    }
  );
};

const getUser = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], function (err, row) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, row);
  });
};

module.exports = { createUser, getUser };
