import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function Signup({ setToken }) {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate("");

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setusername(value);
  };
  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const onChangeConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const onSubmission = async (e) => {
    e.preventDefault();
    try {
      if (username === "" || email === "" || password === "") {
        throw new Error("Please fill all the fields");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(
        "https://marvel-back-express.herokuapp.com/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      Cookie.set("marvel-user-token", response.data.token);
      setToken(response.data.token);
      /* It redirects the user to the home page. */
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="page-register">
      <div className="page-register-block-image"></div>
      <div className="page-block-form">
        <h2>Register</h2>

        <p>{error}</p>
        <form className="form-user" onSubmit={onSubmission}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={onChangeUsername}
          />
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={onChangeConfirmPassword}
          />
          <input type="submit" name="submit" value="Register" />
        </form>
        <Link className="form-user-link" to="/login">
          Already have an account?<br/><span>Connect yourself !</span>
        </Link>
      </div>
    </div>
  );
}
