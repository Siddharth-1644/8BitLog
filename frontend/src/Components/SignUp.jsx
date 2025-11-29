import React, { useState } from "react";
import mainlogo from "../assets/mainlogo.png";

export const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      return setError("All fields are required.");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully!");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      {/* logo + title side-by-side */}
      <div
      className="logo-row"
      style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      marginBottom: "10px",
      }}
>
  <img
    src={mainlogo}
    alt="8BitLog Logo"
    style={{
      height: "70px",
      width: "auto",
      objectFit: "contain",
    }}
  />
  <div className="logo">8BitLog</div>
</div>


      <p className="subtitle">Create an account to continue.</p>

      <div className="input-box">
        <input
          className="input-field"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <input
          className="input-field"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button className="signup-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "lightgreen", marginTop: "10px" }}>{success}</p>}

      <p className="login-text">
        Already have an account? <span className="login-link">Login Page</span>.
      </p>
    </div>
  );
};

export default SignUp;
