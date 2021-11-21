import "../App.css";
import "../css/bookmarks.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../components/Login";

const Bookmarks = () => {
  // gestion des favoris par le local storage
  const token = Cookies.get("Login");
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksComics, setBookmarksComics] = useState([]);
  const [BDD, setBDD] = useState();
  const [data, setData] = useState([]);

  //const lsComics = localStorage.getItem("favoriteComics");
  useEffect(() => {
    const ls = localStorage.getItem("favorite");
    if (ls) setBookmarks(JSON.parse(ls));
  }, []);

  useEffect(() => {
    const lsComics = localStorage.getItem("favoriteComics");
    if (lsComics) setBookmarksComics(JSON.parse(lsComics));
  }, []);

  const handleDeleteBDD = async (elem) => {
    console.log("a effacer", elem._id);
    const response = await axios.post(
      `http://localhost:4000/bookmarks/delete`,
      {
        id: elem._id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          // authorization: "Bearer " + token,
        },
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/bookmarks`, {
          headers: {
            authorization: `Bearer ${token}`,
            // authorization: "Bearer " + token,
          },
        });
        setData(response.data);
        console.log("ma réponse", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  //console.log("mes datas", data[0]._id);

  return (
    <div>
      <div className="bookmarks">
        <h2>Mes comics préférés</h2>
        <div className="gallery">
          {bookmarksComics.map((elem) => {
            return (
              <div key={elem._id}>
                <div className="bloc3">
                  {" "}
                  <div className="dislike">
                    <FontAwesomeIcon
                      icon={["fas", "heart-broken"]}
                      onClick={() => {
                        let toRemove = bookmarksComics.find(
                          (item) => item._id === elem._id
                        );

                        const index = bookmarksComics.indexOf(toRemove);
                        console.log("monindex", index);
                        bookmarksComics.splice(index, 1);

                        localStorage.setItem(
                          "favoriteComics",
                          JSON.stringify(bookmarksComics)
                        );
                        window.location.reload();
                      }}
                    />
                  </div>
                  <div className="image">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="miniature du personnage"
                    ></img>
                  </div>
                  <div className="details3">
                    <div className="title">{elem.title}</div>
                    <div className="description">{elem.description}</div>
                  </div>
                  <div>{console.log(elem.name)}</div>
                </div>{" "}
                <div className="blur"> </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <div className="bookmarks">
        <h2>Mes personnages préférés</h2>

        {bookmarks.map((elem) => {
          return (
            <div key={elem._id}>
              {" "}
              <div className="dislike">
                <FontAwesomeIcon
                  icon={["fas", "heart-broken"]}
                  onClick={() => {
                    console.log("toremove");
                    let toRemove = bookmarks.find(
                      (item) => item._id === elem._id
                    );

                    const index = bookmarks.indexOf(toRemove);
                    console.log("monindex", index);
                    bookmarks.splice(index, 1);

                    localStorage.setItem("favorite", JSON.stringify(bookmarks));
                    window.location.reload();
                  }}
                />
              </div>
              <Link
                to={`/characters/${elem._id}`}
                state={{
                  name: elem.name,
                  id: elem._id,
                  desc: elem.description,
                }}
              >
                <div className="bloc3">
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
            </div>
          );
        })}
      </div>
      <div className="BDD">
        <h2>Ma Base de donnée</h2>{" "}
        {token ? (
          <div>
            <div className="bookmarks">
              {data.map((elem) => {
                return (
                  <div key={elem._id}>
                    {" "}
                    <div className="bloc3">
                      {" "}
                      <div className="dislike">
                        <FontAwesomeIcon
                          icon={["fas", "heart-broken"]}
                          onClick={() => {
                            handleDeleteBDD(elem);
                            window.location.reload();
                          }}
                        />
                      </div>
                      <div className="image">
                        <img
                          src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                          alt="miniature du personnage"
                        ></img>
                      </div>
                      <div className="details3">
                        <div className="title">{elem.title}</div>
                        <div className="description">{elem.description}</div>
                      </div>
                      <div>{console.log(elem.name)}</div>
                    </div>{" "}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>"Merci de vous connecter pour accéder à la BDD"</div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
