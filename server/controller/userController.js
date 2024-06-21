const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel");
const { generateToken } = require("../middlewares/authMiddleware");

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(402)
        .json({ success: false, message: "give valid credentials" });
    }

    userModel.getUser(email, (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "error in signup",
          error: err.message,
        });
      }

      if (user) {
        return res
          .status(401)
          .json({ success: false, message: "user aldready registered" });
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);

      userModel.createUser(name, email, hashedPassword, (err, user) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "failed to signup",
            error: err.messafe,
          });
        }

        const token = generateToken({ id: user.id, email });

        return res.status(200).json({
          success: true,
          message: "successfully signedup",
          user,
          token,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(402)
        .json({ success: false, message: "please provide email and password" });
    }

    userModel.getUser(email, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "cannot login" });
      } else if (!user) {
        return res
          .status(402)
          .json({ success: false, message: "user not found" });
      }

      const passwordMatch = bcryptjs.compareSync(password, user.password);

      if (!passwordMatch) {
        return res
          .status(402)
          .json({ success: false, message: "invalid credentials" });
      }

      user.password = undefined;
      const token = generateToken({ id: user.id, email });

      return res
        .status(200)
        .json({ success: true, message: "login successfull", user, token });
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyLogin = (req, res) => {
  return res.status(200).send({ sucess: true, messaage: "user logged in" });
};

module.exports = { signUpController, loginController, verifyLogin };
