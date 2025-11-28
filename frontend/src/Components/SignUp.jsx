import React from "react";


export const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="logo">8BitLog</div>

      
      <p className="subtitle">Create an account to continue.</p>

      <div className="input-box">
        <input className="input-field" placeholder="Username" />
      </div>

      <div className="input-box">
        <input className="input-field" placeholder="Email" />
      </div>

      <div className="input-box">
        <input className="input-field" type="password" placeholder="Password" />
      </div>

      <button className="signup-btn">Sign Up</button>

      <p className="login-text">
        Already have an account? <span className="login-link">Login Page</span>.
      </p>
    </div>
  );
};
export default SignUp;