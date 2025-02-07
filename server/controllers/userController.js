const userModel = require("../models/user.model");

//  getAllUser
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get user by Id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the user." });
  }
};

// DELETE REQUEST
const removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The user" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  removeUser,
};
