import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

// cookieFavorites={cookieFavorites} setCookieFavorites={setCookieFavorites}
const Characters = ({ token, cookieFavorites, setCookieFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");
  const [favoritesCharacters, setFavoritesCharacters] = useState("");

  const [skip, setSkip] = useState(0);
  const [countData, setCountData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(
      // `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`,
      `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    console.log("response chara", response);
    setCharacters(response.data.results);
    setCountData(response.data.count);
    setIsLoading(false);
  };
  const limitComics = 100;

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search, skip]);

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
      <div className="containe-card">
        {characters.map((character) => {
          {
            /* console.log('character', character); */
          }

          return (
            <Link to={`/character/${character._id}`}>
              <Card
                cookieFavorites={cookieFavorites}
                setCookieFavorites={setCookieFavorites}
                token={token}
                key={character._id}
                id={character._id}
                name={character.name}
                imageLink={character.thumbnail.path}
                imageExtension={character.thumbnail.extension}
                setFavoritesComics={setFavoritesCharacters}
                dataElement={character}
                nameElement="character"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
