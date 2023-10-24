import { useState } from "react";

export default function Register({ dispatchUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleRegister() {
    const { username } = formData;
    dispatchUser({ type: "REGISTER", username });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        name="username"
        id="register-username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="password"
        id="register-password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        name="passwordRepeat"
        id="register-password-repeat"
        value={formData.passwordRepeat}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          formData.username.length === 0 ||
          formData.password.length === 0 ||
          formData.password !== formData.passwordRepeat
        }
      />
    </form>
  );
}
