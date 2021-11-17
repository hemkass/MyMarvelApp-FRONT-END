import "../App.css";
import "../css/home.css";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import Characters from "./Characters";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters/title=${search}`
        );
        //console.log(response.data);
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
        {data.results
          /*.filter((elem) => {
            return elem.name.toLowerCase().includes(search.toLowerCase());
          })*/
          .map((elem, index) => {
            return (
              <Link
                key={elem._id}
                to={`/characters/${elem._id}`}
                state={{
                  name: elem.name,
                  id: elem._id,
                  desc: elem.description,
                }}
              >
                <div className="bloc">
                  <div className="image">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="miniature du personnage"
                    ></img>
                  </div>
                  <div className="details">
                    <div className="title">{elem.name}</div>{" "}
                    {elem.description && (
                      <div className="description">{elem.description}</div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
