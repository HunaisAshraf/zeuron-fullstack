const express = require("express");
const { requireSignin } = require("../middlewares/authMiddleware");
const {
  getAllRecepiecontroller,
  addRecipeController,
  editRecipeController,
  deleteRecipeController,
  searchRecepiecontroller,
  getImageController,
  getRecepiecontroller,
  addCategoryController,
  getAllCategory,
  filterByCategoryController,
} = require("../controller/recipeController");
const upload = require("../helper/multer");
const router = express.Router();

router.get("/get-all-recipe", requireSignin, getAllRecepiecontroller);
router.get("/get-recipe/:id", requireSignin, getRecepiecontroller);
router.post(
  "/add-recipe",
  requireSignin,
  upload.single("image"),
  addRecipeController
);
router.put(
  "/edit-recipe/:id",
  requireSignin,
  upload.single("image"),
  editRecipeController
);
router.delete("/delete-recipe/:id", requireSignin, deleteRecipeController);
router.get("/search-recipe", requireSignin, searchRecepiecontroller);
router.get("/get-image", requireSignin, getImageController);
router.post("/add-category",requireSignin,addCategoryController)
router.get("/get-all-category",requireSignin,getAllCategory)
router.get("/filter",requireSignin,filterByCategoryController)

module.exports = router;
