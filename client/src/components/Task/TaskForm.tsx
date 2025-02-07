import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/slices/taskSlice";
import { createTask } from "../../api/taskApi";
import "../../styles/TaskForm.css";

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [priority, setPriority] = useState<string>("low");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 🔵 Start loading

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      setLoading(false);
      return;
    }

    const newTask = {
      name,
      description,
      priority,
      status,
    };

    try {
      const createdTask = await createTask(newTask, token);
      dispatch(addTask(createdTask));
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          ✖
        </button>
        <h3 className="form-title">Add a New Task</h3>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              className="title-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="submit-add-button"
            disabled={loading}
          >
            {loading ? "submitting..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
