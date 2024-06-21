const JWT = require("jsonwebtoken");

const generateToken = (data) => {
  try {
    const token = JWT.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const requireSignin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    res.status(402).send({
      success: false,
      message: "user not authorised",
    });
  }
};

module.exports = { generateToken, requireSignin };
