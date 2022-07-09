import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import logo from "./asset/images/marvel-logo.png";

import Home from "./pages/Home/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

library.add(faMagnifyingGlass);

function App() {
  const cookieData =
    Cookies.get("marvel-user-data") &&
    JSON.parse(Cookies.get("marvel-user-data"));
  const [token, setToken] = useState(cookieData?.token || null);
  // console.log("token", token);
  const [cookieFavorites, setCookieFavorites] = useState(cookieData?.favorites);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav className="App-nav App-nav-first">
            <Link to="/">
              <img src={logo} alt="marvel logo" className="App-logo" />
            </Link>
            <div className="App-user-navigation">
              {token ? (
                <button
                  onClick={() => {
                    Cookies.remove("marvel-user-data");
                    setToken(null);
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </>
              )}
            </div>
          </nav>

          <nav className="App-nav App-nav-second">
            <Link to="/">Home</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/characters">Character</Link>
            {token && <Link to="/favorites">Favorites</Link>}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                cookieFavorites={cookieFavorites}
                setCookieFavorites={setCookieFavorites}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
                token={token}
                cookieFavorites={cookieFavorites}
                setCookieFavorites={setCookieFavorites}
              />
            }
          />
          <Route
            path="/character/:characterId"
            element={<Character token={token} />}
          />

          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                cookieFavorites={cookieFavorites}
                setCookieFavorites={setCookieFavorites}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
