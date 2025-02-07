const taskModel = require("../models/task.model");

// GET REQUEST - find task
const findTask = async (req, res) => {
  try {
    const { search = "", status } = req.query;
    const query = { userId: req.user._id };

    if (search) query.name = new RegExp(search, "i");
    if (status) query.status = status;

    const tasks = await taskModel.find(query);
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// POST REQUEST - create new tasks
const createNewTask = async (req, res) => {
  try {
    const newTask = new taskModel({ ...req.body, userId: req.user._id });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
};

// PATCH REQUEST - update task status
const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body);
    await task.save();
    res.status(204).send("Task status updated");
  } catch (err) {
    console.log({ err: err, msg: " Task status updated error!" });
    res.send({ success: false, msg: " Task status updated error!", err: err });
  }
};

// DELETE REQUEST - delete task
const removeTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.json({ status: 200, message: "Task deleted" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
};

module.exports = {
  findTask,
  createNewTask,
  updateTask,
  removeTask,
};
