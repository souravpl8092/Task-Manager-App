import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import TaskList from "../components/Task/TaskList";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Task.css";
import { Tooltip } from "react-tooltip";

const TaskPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have logged out successfully!", { position: "top-right" });
    navigate("/");
  };

  return (
    <div className="task-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">Task Manager</h1>
        <button
          className="logout-button"
          onClick={handleLogout}
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Logout"
        >
          <i>Logout ⏻</i>
        </button>
        <Tooltip id="logout-tooltip" />
      </nav>

      <TaskList />

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default TaskPage;
