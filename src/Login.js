import React, { useState } from "react";

export default function Login({ dispatch }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleLogin() {
    const { username } = formData;
    dispatch({ type: "LOGIN", username });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        name="username"
        id="login-username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="login-password">Password:</label>
      <input
        type="password"
        name="password"
        id="login-password"
        value={formData.password}
        onChange={handleChange}
      />
      <input type="submit" value="Login" disabled={formData.username.length === 0} />
    </form>
  );
}
