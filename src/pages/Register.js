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

      const response = await axios.post("http://localhost:3200/register", {
        username: username,
        email: email,
        password: password,
      });

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
      <p>{error}</p>
      <form onSubmit={onSubmission}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Nom de l'utilisateur"
          onChange={onChangeUsername}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Adresse email"
          onChange={onChangeEmail}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Mot de passe"
          onChange={onChangePassword}
        />
        <input
          type="password"
          name="password"
          value={confirmPassword}
          placeholder="Mot de passe"
          onChange={onChangeConfirmPassword}
        />
        <input type="submit" name="submit" value="Register" />
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
}
