const express = require("express");
const taskRouter = express.Router();
const authMiddleware = require("../middleware/authenticate.middleware");

const {
  findTask,
  createNewTask,
  updateTask,
  removeTask,
} = require("../controllers/taskController");

taskRouter.use(authMiddleware);
taskRouter.route("/").get(findTask).post(createNewTask);
taskRouter.route("/:id").patch(updateTask).delete(removeTask);

module.exports = taskRouter;
