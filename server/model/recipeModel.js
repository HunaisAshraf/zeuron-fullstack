const db = require("../databases/recipeDB");

const getAllRecipie = (id, callback) => {
  db.all("SELECT * FROM recipes WHERE user_id = ?", [id], function (err, row) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, row);
  });
};

const getRecipie = (id, callback) => {
  db.get("SELECT * FROM recipes WHERE id = ?", [id], function (err, row) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, row);
  });
};

const addRecipe = (item, ingredient,image, user_id, category_id, callback) => {
  db.run(
    "INSERT INTO recipes (item, ingredient, image, user_id, category_id) VALUES (?,?,?,?,?)",
    [item, ingredient, image, user_id,category_id],
    function (err) {
      if (err) {
        console.log(err);
        callback(err);
        return;
      }
      callback(null, { id: this.lastID, item, ingredient, user_id });
    }
  );
};

const editRecipe = (id, item, ingredient, image, user_id, callback) => {
  db.run(
    "UPDATE recipes SET item = ?, ingredient = ?, image = ?, user_id = ? WHERE id = ?",
    [item, ingredient, image, user_id, id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id, item, ingredient, user_id });
    }
  );
};

const deleteRecipe = (id, callback) => {
  db.run("DELETE FROM recipes WHERE id = ?", [id], (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

const searchRecipe = (user_id, searchKey, callback) => {
  db.all(
    "SELECT * FROM recipes WHERE user_id = ? AND item LIKE ?",
    [user_id, `${searchKey}%`],
    function (err, row) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, row);
    }
  );
};

const getImage = (id, callback) => {
  db.get("SELECT image FROM recipes WHERE id = ?", [id], function (err, row) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, row);
  });
};

const filterRecipe = (user_id, category_id, callback) => {
  db.all("SELECT * FROM recipes WHERE user_id = ? AND category_id = ?", [
    user_id,
    category_id,
  ],function(err,row){
    if(err){
      callback(err);
      return
    }
    callback(null,row)
  });
};

module.exports = {
  addRecipe,
  getAllRecipie,
  getRecipie,
  editRecipe,
  deleteRecipe,
  searchRecipe,
  getImage,
  filterRecipe
};
