const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const recipeRouter = require("./routes/recipeRoute");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/recipe", recipeRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
