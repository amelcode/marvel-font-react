import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const Characters = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");
  const [favoritesCharacters, setFavoritesCharacters] = useState("");

  const [skip, setSkip] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`
    );
    setCharacters(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`
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
          `https://marvel-back-express.herokuapp.com/characters?skip=${skip}&name=${search}`
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
    <p>En cours de chargement</p>
  ) : (
    <div className="page-characters">
      <h1>Character</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="search" />
      </form>

      <div className="containe-card">
        {characters.map((character) => {
          return (
            <Card
              key={character._id}
              id={character._id}
              name={character.name}
              // description={comic.description}
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
