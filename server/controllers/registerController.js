const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();

const registerUser = async (req, res) => {
  {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = registerUser;
