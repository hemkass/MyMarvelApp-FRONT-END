import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";
import Bookmarks from "./Pages/Bookmarks";
import Signup from "./components/Signup";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCloudUploadAlt,
  faEnvelope,
  faTimes,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSearch,
  faEnvelope,
  faTimes,
  faHeart,
  faCloudUploadAlt,
  faHeartBroken
);

function App() {
  return (
    <Router>
      <div className="wrapper">
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/characters/:id" element={<Characters />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          <Route path="/bookmarks" element={<Bookmarks />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
