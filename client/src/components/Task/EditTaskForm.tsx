import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateTask } from "../../store/slices/taskSlice";
import { Task } from "../../api/taskApi";
import "../../styles/TaskList.css";

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
  loadTasks: () => void;
  token: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onClose,
  loadTasks,
  token,
}) => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const [editedName, setEditedName] = useState<string>(task.name);
  const [editedDescription, setEditedDescription] = useState<string>(
    task.description
  );
  const [editedPriority, setEditedPriority] = useState<string>(task.priority);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedTask: Task = {
      ...task,
      name: editedName,
      description: editedDescription,
      priority: editedPriority,
    };

    try {
      await dispatch(updateTask({ task: updatedTask, token })).unwrap();
      await loadTasks();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-task-form-container">
      <form onSubmit={handleEditSubmit} className="edit-task-form">
        <button type="button" onClick={onClose} className="cancel-icon-button">
          ✖
        </button>
        <h3>Edit Task</h3>

        <div className="form-group">
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            className="title-edit-input"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="description-edit-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="submit-edit-button" disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
