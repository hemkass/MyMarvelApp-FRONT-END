import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";
import Bookmarks from "./Pages/Bookmarks";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEnvelope,
  faTimes,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEnvelope, faTimes, faHeart, faHeartBroken);

function App() {
  return (
    <body>
      <div className="wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/characters/:id" element={<Characters />}></Route>
            <Route path="/comics" element={<Comics />}></Route>
            <Route path="/bookmarks" element={<Bookmarks />}></Route>
          </Routes>
        </Router>
      </div>
    </body>
  );
}

export default App;
