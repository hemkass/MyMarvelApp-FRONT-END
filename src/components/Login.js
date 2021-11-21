import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState } from "react";

const Login = ({ className, connected, setConnected, login, setLogin }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setLogin(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email: `${email}`,
        password: `${password}`,
      });
      setData(response.data);
      setIsLoading(false);

      if (response.data.token) {
        Cookies.set("Login", response.data.token, { expires: 30 });

        setLogin(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 428) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon
          onClick={handleClose}
          className="closebutton"
          icon="times"
        />
        <h1>Se connecter</h1>
        <div>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          ></input>
        </div>
        <div>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Mot de passe"
            value={password}
          ></input>
        </div>
        <div>
          <div className="submitbutton">
            <button type="Submit">se connecter</button>
          </div>
        </div>{" "}
        {!isLoading && (
          <div>
            <span className="error">{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
