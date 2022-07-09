import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login({ setToken, setUserFavorites }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const submission = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const response = await axios.post(
        "https://marvel-back-express.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("response", response);
      setUserFavorites(response.data.favorites);
      const userData = JSON.stringify(response.data);
      console.log("userData", userData);

      Cookies.set("marvel-user-data", userData);
      setToken(response.data.token);

      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="page-login">
      <div className="page-login-block-image"></div>
      <div className="page-block-form">
        <h2>Login</h2>
        <form className="form-user" onSubmit={submission}>
          {error && <p>Incorrect username or password</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
          />
          <input type="submit" value="Login" />
        </form>
        <Link className="form-user-link" to="/register">
          No account yet? Register yourself !
        </Link>
      </div>
    </div>
  );
}
