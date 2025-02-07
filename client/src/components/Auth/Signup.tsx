import React, { useState } from "react";
import { signupUser } from "../../api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/signup.css";

interface SignupProps {
  closeModal: () => void;
  openLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ closeModal, openLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signupUser(name, email, password);

      if (data.message === "User registered successfully") {
        toast.success("Registered successfully! 🎉", { position: "top-right" });

        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        toast.error("Signup failed. Please try again.", {
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (err) {
      setError("Error signing up. Please check your details.");
      toast.error("Error signing up. Please try again.", {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closeModal}>
          ✖
        </button>
        <h1 className="modal-title">Create an Account</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modal-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal-input"
            required
          />
          <button type="submit" className="modal-button" disabled={loading}>
            {loading ? "Signing..." : "Sign Up"}
          </button>
          <p className="login-text">
            Already have an account? <span onClick={openLogin}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
