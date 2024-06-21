const express = require("express");
const {
  signUpController,
  loginController,
  verifyLogin,
} = require("../controller/userController");
const { requireSignin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signUpController);
router.get("/verify-login", requireSignin, verifyLogin);

module.exports = router;
