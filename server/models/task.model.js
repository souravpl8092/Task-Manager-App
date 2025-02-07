const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    priority: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
