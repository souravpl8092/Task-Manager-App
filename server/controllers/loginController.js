const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const loginUser = async (req, res) => {
  {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN, {
      expiresIn: "1h",
    });
    res.header("Authorization", token).send({ token });
  }
};

module.exports = loginUser;
