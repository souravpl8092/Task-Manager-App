import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";

interface LoginProps {
  closeModal: () => void;
  openSignin: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal, openSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        dispatch(login({ email, token: data.token }));
        toast.success("Login successful!", { position: "top-right" });

        setTimeout(() => {
          closeModal();
          navigate("/tasks");
        }, 2000);
      } else {
        setError("Invalid credentials. Please try again.");
        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closeModal}>
          ✖
        </button>
        <h1 className="login-title">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging..." : "Login"}
          </button>
          <p className="signup-text">
            Don't have an account? <span onClick={openSignin}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
