import { useEffect, useState } from "react";

import { useResource } from "react-request-hook";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));


  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatch({
          type: "LOGIN",
          username: username,
          access_token: user.data.access_token,
        });
        localStorage.setItem("user", JSON.stringify({ username }));
        localStorage.setItem("accessToken", user.data.access_token);
      }
    }
  }, [user]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    login(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={user.username}
        onChange={handleUsername}
      />
      <label htmlFor="login-password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="login-username"
        id="login-username"
      />
      {formSubmitted && loginFailed && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}