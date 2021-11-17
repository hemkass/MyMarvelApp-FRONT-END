import "../App.css";
import "../css/home.css";

import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics?title=${search}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div className="wrapper">
      <h1>Les comics</h1>
      <input
        type="search"
        placeholder="rechercher"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      ></input>
      <div className="section">
        {data
          /*.filter((elem) => {
            return elem.title.toLowerCase().includes(search.toLowerCase());
          })*/
          .map((elem, index) => {
            return (
              <div key={elem._id} className="bloc">
                <div className="image">
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt="miniature du personnage"
                  ></img>
                </div>
                <div className="details">
                  <div className="title">{elem.title}</div>
                  <div className="description">{elem.description}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comics;
