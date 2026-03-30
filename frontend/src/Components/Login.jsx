import React, { useState } from "react";
import mainlogo from "../assets/mainlogo.png"; // keep same asset you used for SignUp

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.emailOrUsername.trim()) return "Email or username is required.";
    if (!form.password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important to receive HttpOnly cookie
        body: JSON.stringify({
          emailOrUsername: form.emailOrUsername,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Login failed. Check credentials.");
        setLoading(false);
        return;
      }

      // data should contain accessToken and user (see backend)
      setSuccess("Logged in successfully!");
      setForm({ emailOrUsername: "", password: "" });

      // TODO: store accessToken in React state / context and redirect to dashboard
      // e.g. setAuth({ token: data.accessToken, user: data.user });

    } catch (err) {
      setError("Server error — try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-container" aria-live="polite">
      {/* logo image + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={mainlogo} alt="8BitLog logo" style={{ width: 56, height: "auto" }} />
        <div className="logo">8BitLog</div>
      </div>

      <p className="subtitle">Welcome back — sign in to continue.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
      >
        <div className="input-box">
          <input
            name="emailOrUsername"
            className="input-field"
            placeholder="Email or Username"
            value={form.emailOrUsername}
            onChange={handleChange}
            autoComplete="username"
            aria-label="Email or Username"
          />
        </div>

        <div className="input-box">
          <input
            name="password"
            type="password"
            className="input-field"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-label="Password"
          />
        </div>

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      {error && <p style={{ color: "#ff9b9b", marginTop: 12 }}>{error}</p>}
      {success && <p style={{ color: "#b8f3c8", marginTop: 12 }}>{success}</p>}

      <p className="login-text" style={{ marginTop: 18 }}>
        Don't have an account? <span className="login-link" style={{ cursor: "pointer" }}>Sign up</span>.
      </p>
    </main>
  );
}
