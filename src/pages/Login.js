import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

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
    try {
      const response = await axios.post(
        "http://localhost:3200/login",
        {
          email: email,
          password: password,
        }
      );
      Cookie.set("marvel-user-token", response.data.token);
      setToken(response.data.token);

      navigate("/")
      
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="page-login">
      <form onSubmit={submission}>
      {error && <p>Incorrect username or password</p>}
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
        <input type="submit" value="Se connecter" />
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
}
