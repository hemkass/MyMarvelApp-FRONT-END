import "../App.css";
import "../css/comics.css";
import { useLocation } from "react-router-dom";
import "../css/comics.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Characters = () => {
  const location = useLocation();
  const { name, id, description } = location.state;

  const handlePageClick = (event) => {
    console.log(event);
    setSkip((event - 1) * 100);
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-bk.herokuapp.com/comics/${id}`
        ); //`http://localhost:4000/comics/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div className="wrapper">
      <h1>{name} est présent dans les comics suivants :</h1>
      <div className="section">
        {data.comics.map((elem) => {
          return (
            <div key={elem._id} className="bloc">
              <div className="image">
                <img
                  src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                  alt="miniature du personnage"
                ></img>
              </div>
              <div className="details">
                <div>{elem.title}</div>
                <div>{elem.description}</div>
              </div>
            </div>
          );
        })}
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
    // <div>{data.comics[1]._id}</div>
    /*   <div>
      {data.results.map((elem) => {
        return <div>{elem.comics}</div>;
      })}
    </div>*/
  );
};

export default Characters;
