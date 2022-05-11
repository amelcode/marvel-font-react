import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Comics from "./pages/Comics";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/comics">Comics</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
