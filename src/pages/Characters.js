import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// userFavorites={userFavorites} setUserFavorites={setUserFavorites}
const Characters = ({ token, userFavorites, setUserFavorites }) => {
  // console.log("userFavorites", userFavorites);
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");
  const [favoritesCharacters, setFavoritesCharacters] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const [skip, setSkip] = useState(0);
  const [limit, setlimit] = useState(100);

  const [countData, setCountData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/characters?limit=${limit}&skip=${skip}&name=${search}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    // console.log("response chara", response);
    setCharacters(response.data.results);
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
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="page-characters">
      <h1>Character</h1>
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
        {characters.map((character) => {
          let existInFav = false;

          if (token) {
            if (userFavorites.characters.length !== 0) {
              userFavorites.characters.map((item) => {
                if (item._id === character._id) {
                  existInFav = true;
                }
              });
              console.log("existInFav", existInFav);
            }
          }

          return (
            <Link to={`/character/${character._id}`}>
              <Card
                userFavorites={userFavorites}
                setUserFavorites={setUserFavorites}
                token={token}
                key={character._id}
                id={character._id}
                name={character.name}
                imageLink={character.thumbnail.path}
                imageExtension={character.thumbnail.extension}
                setFavoritesComics={setFavoritesCharacters}
                dataElement={character}
                nameElement="characters"
                isFavorite={existInFav}
                setIsFavorite={setIsFavorite}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
