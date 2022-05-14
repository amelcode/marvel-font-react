import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

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

library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("marvel-user-token") || null);

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
                    Cookies.remove("marvel-user-token");
                    setToken(null);
                  }}
                >
                  Deconnexion
                </button>
                
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}</div>
          </nav>

          <nav className="App-nav App-nav-second">
            <Link to="/comics">Comics</Link>
            <Link to="/characters">Character</Link>
            {token && <Link to="/favorites">Favorites</Link>}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:characterId" element={<Character />} />

          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/favorites" element={<Favorites token={token} />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
