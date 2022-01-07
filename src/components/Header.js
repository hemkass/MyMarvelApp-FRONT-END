import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";

import Signup from "../components/Signup";
import Login from "../components/Login";

const Header = () => {
  const token = Cookies.get("Login");
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <header>
      <Signup
        signUp={signUp}
        setSignUp={setSignUp}
        className={signUp === false ? "hidden" : "modal"}
      />
      <Login
        login={login}
        setLogin={setLogin}
        className={login === false ? "hidden" : "modal"}
      />

      <div>
        <img
          className="logo"
          src="https://res.cloudinary.com/dyj84szrx/image/upload/v1637474088/MARVEL/langfr-1920px-MarvelLogo.svg_uw9pi8_nsh0pk.png"
          alt="logo de marvel"
        ></img>

        <div>
          <Link className="noLink" to="/comics">
            <button className="noLink">Comics</button>
          </Link>
          <Link className="noLink" to="/">
            <button className="noLink">Characters</button>
          </Link>

          <Link className="noLink" to="/bookmarks">
            <button className="noLink">favoris</button>
          </Link>
        </div>
        <div>
          <button
            className={token ? "deconnect" : "hidden"}
            onClick={() => {
              Cookies.remove("Login");
              window.location.reload(false);
            }}
          >
            se déconnecter
          </button>
          <button
            className={token ? "hidden" : "subscribe "}
            onClick={() => {
              setSignUp(true);
            }}
          >
            s'inscrire
          </button>
          <button
            className={token ? "hidden" : "subscribe "}
            onClick={() => {
              setLogin(true);
            }}
          >
            se connecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
