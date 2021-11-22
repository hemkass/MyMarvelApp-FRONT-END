import "../App.css";
import "../css/form.css";

import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Signup = ({ signUp, setSignUp, className }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [phone, setPhone] = useState("");

  const [preview, setPreview] = useState();

  const handleClose = () => {
    setSignUp(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", username);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("picture", file);
      console.log(formData);
      const response = await axios.post(
        `https://marvel-bk.herokuapp.com/user/signup`,
        // "http://localhost:4000/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.token) {
        Cookies.set("Login", response.data.token, { expires: 30 });
        setSignUp(false);
        setIsLoading(false);
        //console.log(response.data);
      }
    } catch (error) {
      setError("Not authorized");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>{" "}
        <FontAwesomeIcon
          onClick={handleClose}
          className="closebutton"
          icon="times"
        />
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
        ></input>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={(event) => setPhone(event.target.value)}
          type="text"
          placeholder="phone"
          value={phone}
        ></input>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Mot de passe"
          value={password}
        ></input>
        <img src={preview} />
        <label className="avatar">
          {" "}
          mon avatar :
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
              console.log(file);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
          ></input>
        </label>{" "}
        {!isLoading && (
          <div>
            <span className="error">{data.message}</span>
          </div>
        )}
        <div className="submitbutton">
          <button type="Submit">Envoyer</button>
        </div>
      </form>
      <div>
        <span className="error">{error}</span>
      </div>
    </div>
  );
};

export default Signup;
