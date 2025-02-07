import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTasks, deleteTask } from "../../store/slices/taskSlice";
import {
  fetchTasks,
  deleteTask as apiDeleteTask,
  updateTask as apiUpdateTask,
} from "../../api/taskApi";
import { RootState } from "../../store/store";
import { Task } from "../../api/taskApi";
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";
import "../../styles/TaskList.css";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTasks(true);
  }, []);

  useEffect(() => {
    loadTasks(false);
  }, [searchQuery, statusFilter]);

  const loadTasks = async (initialLoad: boolean) => {
    if (initialLoad) setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      setLoading(false);
      return;
    }
    try {
      const fetchedTasks = await fetchTasks(token, searchQuery, statusFilter);
      dispatch(setTasks(fetchedTasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      if (initialLoad) setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  const handleEditClick = (task: Task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  const handleDeleteClick = async (taskId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    try {
      await apiDeleteTask(taskId, token);
      dispatch(deleteTask(taskId));
      await loadTasks(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusToggle = async (task: Task) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }
    try {
      const updatedTask = {
        ...task,
        status: task.status === "completed" ? "pending" : "completed",
      };
      await apiUpdateTask(updatedTask, token);
      await loadTasks(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-list-main-container">
      <div className="task-list-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="status-filter-container">
          <label htmlFor="statusFilter" className="status-filter-label">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>
        <button
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
          data-tooltip-id="add-task-tooltip"
          data-tooltip-content="Add a new task"
        >
          <i>Add Task</i>
        </button>
        <Tooltip id="add-task-tooltip" />
      </div>

      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks-container">
          <h3>
            <i>No task record found</i>
          </h3>
        </div>
      ) : (
        <div className="task-list-container">
          {tasks.map((task: Task, index) => (
            <motion.div
              key={task._id}
              className={`task-card ${task.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="task-card-header">
                <h3>{task.name}</h3>
                <span className={`badge priority-${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
                <div
                  onClick={() => handleEditClick(task)}
                  className="action-button edit-button"
                  data-tooltip-id="edit-task-tooltip"
                  data-tooltip-content="Edit task"
                >
                  <i className="fas fa-edit"></i>
                </div>
                <Tooltip id="edit-task-tooltip" />
              </div>
              <p className="task-description">{task.description}</p>
              <p className="task-status">
                Status:{" "}
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </p>

              <div className="task-actions">
                <button
                  onClick={() => handleDeleteClick(task._id)}
                  className="action-button delete-button"
                  data-tooltip-id="delete-task-tooltip"
                  data-tooltip-content="Delete task"
                >
                  <i>Delete</i>
                </button>
                <Tooltip id="delete-task-tooltip" />
                <button
                  onClick={() => handleStatusToggle(task)}
                  className={`action-button ${
                    task.status === "completed"
                      ? "pending-button"
                      : "complete-button"
                  }`}
                >
                  {task.status === "completed"
                    ? "Mark as Pending"
                    : "Mark as Complete"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for Adding Task */}
      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}

      {/* Modal for Editing Task */}
      {isEditing && currentTask && (
        <EditTaskForm
          task={currentTask}
          onClose={() => setIsEditing(false)}
          loadTasks={() => loadTasks(false)}
          token={localStorage.getItem("token") || ""}
        />
      )}
    </div>
  );
};

export default TaskList;
