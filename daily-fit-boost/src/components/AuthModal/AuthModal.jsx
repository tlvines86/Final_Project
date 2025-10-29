import React, { useState } from "react";
import "./AuthModal.css";
import { AiOutlineClose } from "react-icons/ai";

const mockUsers = [
  { email: "test@example.com", password: "123456", name: "Test User" },
];

function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const user = mockUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        onAuthSuccess(user);
        onClose();
      } else {
        setError("Invalid email or password");
      }
    } else {
      const exists = mockUsers.find((u) => u.email === formData.email);
      if (exists) {
        setError("User already exists");
      } else {
        const newUser = { ...formData };
        mockUsers.push(newUser);
        onAuthSuccess(newUser);
        onClose();
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
