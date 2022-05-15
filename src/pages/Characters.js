import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";

const Characters = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");
  const [favoritesCharacters, setFavoritesCharacters] = useState("");

  const [skip, setSkip] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    setCharacters(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`,
          {
            headers: {
              "Access-Control-Allow-Origin": true,
            },
          }
        );
        setCharacters(response.data.results);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleSubmit = (e, fetchData) => {
    e.preventDefault();
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`,
          {
            headers: {
              "Access-Control-Allow-Origin": true,
            },
          }
        );
        setCharacters(response.data.results);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
   <Loading/>
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

      <div className="containe-card">
        {characters.map((character) => {
          return (
            <Card
              key={character._id}
              id={character._id}
              name={character.name}
              imageLink={character.thumbnail.path}
              imageExtension={character.thumbnail.extension}
              setFavoritesComics={setFavoritesCharacters}
              objFav={{ favoritesCharacters: character._id }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
