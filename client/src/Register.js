import React, { useEffect, useState } from "react";

import { useResource } from "react-request-hook";

export default function Register({ dispatch }) {
  const initialFormData = {
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [register, registerRequest] = useResource(({ email, password }) => ({
    url: "/register",
    method: "post",
    data: { email, password },
  }));

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (register && register.data) {
      dispatch({ type: "REGISTER", email: register.data.email });
      setRegistrationSuccess(true);
    }
  }, [register, dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
        setFormData(initialFormData); // Clear form values
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, setFormData]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleRegister() {
    const { email, password } = formData;
    registerRequest({ email, password });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <label htmlFor="register-email">Email:</label>
        <input
          type="text"
          name="email"
          id="register-email"
          value={formData.email}
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
            formData.email.length === 0 ||
            formData.password.length === 0 ||
            formData.password !== formData.passwordRepeat
          }
        />
      </form>

      {registrationSuccess && (
        <div>
          User created successfully! Redirecting to home page...
        </div>
      )}
    </div>
  );
}