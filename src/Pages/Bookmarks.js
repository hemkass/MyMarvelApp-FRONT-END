import "../App.css";
import "../css/home.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const ls = localStorage.getItem("favorite");
  useEffect(() => {
    if (ls) setBookmarks(JSON.parse(ls));
  }, [bookmarks]);

  return (
    <div>
      <div></div>
      <div>
        <h2>Mes personnages préférés</h2>
        {bookmarks.map((elem) => {
          return (
            <div>
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
              </Link>{" "}
              <div>
                {console.log(elem.name)}
                <FontAwesomeIcon
                  icon={["fas", "heart-broken"]}
                  onClick={() => {
                    localStorage.removeItem("favorite");
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
