import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// userFavorites={userFavorites} setUserFavorites={setUserFavorites}

const Comics = ({ token, userFavorites, setUserFavorites }) => {
  // console.log("userFavorites", userFavorites);

  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState(null);
  // console.log("comics", comics);
  const [search, setSearch] = useState("");
  const [favoritesComics, setFavoritesComics] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const [skip, setSkip] = useState(0);
  const [limit, setlimit] = useState(100);

  const [countData, setCountData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/comics?skip=${skip}&title=${search}&limit=${limit}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    // console.log("response comics", response);

    setComics(response.data.results);
    setCountData(response.data.count);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search, skip, limit]);

  const changeLimit = (e) => {
    setlimit(e.target.value);
  };

  const handleSubmit = (e, fetchData) => {
    e.preventDefault();
    console.log("search", search);
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="page-comics">
      <h1>Comics</h1>

      <div className="elementChangeSee">
        <form className="form-search" onSubmit={handleSubmit}>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
              console.log("search", search);
            }}
          />
          <input type="submit" value="Search" />
        </form>

        <Pagination
          setSkip={setSkip}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countData={countData}
          limit={limit}
        />
        <select name="limit" id="limit" onChange={changeLimit}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100" selected>
            100
          </option>
        </select>
      </div>
      <div className="containe-card">
        {comics.map((comic) => {
          let existInFav = false;

          if (token) {
            if (userFavorites?.comics.length !== 0) {
              userFavorites.comics.map((item) => {
                if (item._id === comic._id) {
                  existInFav = true;
                }
              });
            }
          }

          return (
            <Card
              userFavorites={userFavorites}
              setUserFavorites={setUserFavorites}
              token={token}
              key={comic._id}
              id={comic._id}
              name={comic.title}
              imageLink={comic.thumbnail.path}
              imageExtension={comic.thumbnail.extension}
              // setFavoritesComics={setFavoritesComics}
              dataElement={comic}
              nameElement="comics"
              isFavorite={existInFav}
              setIsFavorite={setIsFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Comics;
