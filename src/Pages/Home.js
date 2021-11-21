import "../App.css";
import "../css/home.css";
import { Paginator } from "react-paginator-responsive";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import axios from "axios";

import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [favorite, setFavorite] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  const handlePageClick = (event) => {
    console.log(event);
    setSkip((event - 1) * 100);
  };

  useEffect(
    (event) => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/characters?name=${search}&skip=${skip}&limit=${limit}`
          );
          const count = await axios.get(`http://localhost:4000/count`);
          //console.log(response.data);
          setData(response.data);
          setCount(count.data.caractCount);
          console.log(count.data);
          console.log(response.data);
          //console.log(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    },
    [search, skip]
  );
  //let pageCount = count.caractCount;

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div>
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
                <div key={elem._id}>
                  <Link
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
                  </Link>{" "}
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "heart"]}
                      onClick={() => {
                        setFavorite(elem);
                        //console.log(favorite);
                        if (localStorage.getItem("favorite")) {
                          let arr = JSON.parse(
                            localStorage.getItem("favorite")
                          );
                          console.log("monobjet", arr);

                          console.log(
                            "ma condition",
                            arr.find((item) => item._id === elem._id)
                          );

                          if (!arr.find((item) => item._id === elem._id)) {
                            arr.push(elem);
                            console.log("monobjet2", arr);

                            localStorage.setItem(
                              "favorite",
                              JSON.stringify(arr)
                            );
                          } else {
                            console.log("attention");
                          }
                        } else {
                          let arr2 = [elem];
                          console.log("1er fois", arr2);
                          localStorage.setItem(
                            "favorite",
                            JSON.stringify(arr2)
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>{" "}
      </div>
      <div>
        {
          <Paginator
            page={1}
            pageSize={100}
            pageGroupSize={7}
            totalItems={count}
            callback={handlePageClick}
          />
        }
      </div>
    </div>
  );
};

export default Home;
