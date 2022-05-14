import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorites = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesComics, setFavoritesComics] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState(null);


  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3200/favorites`);
    // console.log("response", response);
    setIsLoading(false);
    setFavoritesComics(response.data.comics);
    setFavoritesCharacters(response.data.characters);
  };

  const fetchDataComics = async (title) => {      

    const response = await axios.get(
      `http://localhost:3200/comics?title=${title}`
      );
      
    console.log('response fetchDataComics', response);
    console.log('response fetchDataComics', response.data);
    // setComics(response.data.results);
    // setCountData(response.data.count);
    setIsLoading(false);
    // console.log('countData', countData);
  };
  useEffect(() => {
    try {
      const token = Cookies.get("marvel-user-token");
      if (token) {
        fetchData();

        // console.log("favoritesComics", favoritesComics);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const fetchDataComics = async (characterId) => {

  //   const response = await axios.get(
  //     `/comics/${characterId}`
  //     );

  //   console.log('response', response);

  //   setIsLoading(false);
  //   // console.log('countData', countData);
  // };

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="page-favorites">
      <h1>favorites</h1>
      <h2>Comics</h2>
      {favoritesComics.map((title) => {

        fetchDataComics(title)
        return (
          <div key={title}>
            <p>{title}</p>
          </div>
        );
      })}
      <h2>Characters</h2>
      {favoritesCharacters.map((character) => {

        return (
          <div key={character}>
            <p>{character}</p>
          </div>
        );
      })}
      
    </div>
  );
};

export default Favorites;
