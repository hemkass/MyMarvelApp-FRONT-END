import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/characters/:id" element={<Characters />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
