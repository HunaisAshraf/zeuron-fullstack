const recipeModel = require("../model/recipeModel");
const categoryModel = require("../model/categoryModel");

const getAllRecepiecontroller = (req, res) => {
  try {
    const { id } = req.user;

    recipeModel.getAllRecipie(id, (err, recipes) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "no items received" });
      }
      return res.status(200).json({
        success: true,
        message: "items retreived successfully",
        recipes,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getRecepiecontroller = (req, res) => {
  try {
    const { id } = req.params;

    recipeModel.getRecipie(id, (err, recipe) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "no items received" });
      }
      return res.status(200).json({
        success: true,
        message: "items retreived successfully",
        recipe,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const addRecipeController = (req, res) => {
  try {
    const { id } = req.user;
    const image = req.file.filename;
    const { item, ingredient, category } = req.body;

    recipeModel.addRecipe(
      item,
      ingredient,
      image,
      id,
      category,
      (err, recipe) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "failed to add recipe" });
        }
        return res
          .status(200)
          .json({
            success: true,
            message: "recipe added successfully",
            recipe,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const editRecipeController = (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { item, ingredient } = req.body;
    let image;
    if (req?.file?.filename) {
      image = req?.file?.filename;
    } else {
      image = req.body.image;
    }

    recipeModel.editRecipe(
      id,
      item,
      ingredient,
      image,
      user_id,
      (err, recipe) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "failed to edit recipe" });
        }

        return res.status(200).json({
          success: true,
          message: "recipe edited successfully",
          recipe,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteRecipeController = (req, res) => {
  try {
    const { id } = req.params;

    recipeModel.deleteRecipe(id, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "failed to delete recipe" });
      }
      return res
        .status(200)
        .json({ success: true, message: "recipe deleted successfully" });
    });
  } catch (error) {
    console.log(error);
  }
};

const searchRecepiecontroller = (req, res) => {
  try {
    const search = req.query.search;
    const { id } = req.user;
    recipeModel.searchRecipe(id, search, (err, recipe) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "failed to search recipe" });
      }
      return res.status(200).json({
        success: true,
        message: "recipe retrieved successfully",
        recipe,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getImageController = (req, res) => {
  try {
    const { id } = req.params;

    recipeModel.getImage(id, (err, image) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "failed to fetch recipe image" });
      }
      return res.status(200).json({
        success: true,
        message: "recipe retrieved successfully",
        image,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const addCategoryController = (req, res) => {
  try {
    const { category } = req.body;
    const { id } = req.user;
    console.log(req.body, id);
    categoryModel.addCategory(category, id, (err, category) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "failed to add category" });
      }
      return res.status(200).json({
        success: true,
        message: "category added successfully",
        category,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = (req, res) => {
  try {
    const { id } = req.user;

    categoryModel.getAllCategory(id, (err, categories) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "failed to fetch category" });
      }
      return res.status(200).json({
        success: true,
        message: "category retrieved successfully",
        categories,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const filterByCategoryController = (req, res) => {
  try {
    const { id } = req.user;
    const category_id = req.query.filter;

    recipeModel.filterRecipe(id, category_id, (err, recipes) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "failed to filter data" });
      }
      return res.status(200).json({
        success: true,
        message: "recipe filtered successfully",
        recipes,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRecepiecontroller,
  getRecepiecontroller,
  addRecipeController,
  editRecipeController,
  deleteRecipeController,
  searchRecepiecontroller,
  getImageController,
  addCategoryController,
  getAllCategory,
  filterByCategoryController,
};
