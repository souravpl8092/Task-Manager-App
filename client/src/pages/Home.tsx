import React, { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="task-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">Task Manager</h1>
        <div className="button-container">
          <button
            onClick={() => setShowSignup(true)}
            className="signup-button"
            data-tooltip-id="Signup-tooltip"
            data-tooltip-content="Sign Up"
          >
            <i>Sign up</i>
          </button>
          <Tooltip id="add-task-tooltip" />
        </div>
      </nav>
      <div className="no-tasks-container">
        <h3>
          <i>Please login to access Task Manager</i>
        </h3>

        <button
          className="signin-button"
          onClick={() => setShowLogin(true)}
          data-tooltip-id="login-tooltip"
          data-tooltip-content="Login"
        >
          <i>Login</i>
        </button>
        <Tooltip id="login-tooltip" />
        {showLogin && (
          <Login
            closeModal={() => setShowLogin(false)}
            openSignin={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
          />
        )}
        {showSignup && (
          <Signup
            closeModal={() => setShowSignup(false)}
            openLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
