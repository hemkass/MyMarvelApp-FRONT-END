import "../App.css";
import "../css/bookmarks.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  // gestion des favoris par le local storage

  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksComics, setBookmarksComics] = useState([]);

  //const lsComics = localStorage.getItem("favoriteComics");
  useEffect(() => {
    const ls = localStorage.getItem("favorite");
    if (ls) setBookmarks(JSON.parse(ls));
  }, []);

  useEffect(() => {
    const lsComics = localStorage.getItem("favoriteComics");
    if (lsComics) setBookmarksComics(JSON.parse(lsComics));
  }, []);

  return (
    <div>
      <div className="bookmarks">
        <h2>Mes comics préférés</h2>
        <div className="gallery">
          {bookmarksComics.map((elem) => {
            return (
              <div key={elem._id}>
                <div className="bloc3">
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
                </div>{" "}
                <div>
                  {console.log(elem.name)}
                  <FontAwesomeIcon
                    icon={["fas", "heart-broken"]}
                    onClick={() => {
                      let toRemove = bookmarks.find(
                        (item) => item._id === elem._id
                      );

                      const index = bookmarks.indexOf(toRemove);
                      console.log("monindex", index);
                      bookmarks.splice(index, 1);

                      localStorage.setItem(
                        "favoriteComics",
                        JSON.stringify(bookmarks)
                      );
                      window.location.reload();
                    }}
                  />
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <div>
        <h2>Mes personnages préférés</h2>

        {bookmarks.map((elem) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
