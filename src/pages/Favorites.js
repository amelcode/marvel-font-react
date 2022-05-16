import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Cookie from "js-cookie";

const Favorites = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesComics, setFavoritesComics] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState(null);

  // const fetchData = async () => {

  //   const response = await axios.get(
  //     `https://marvel-back-express.herokuapp.com/favorites`,
  //     {headers: {
  //       'Access-Control-Allow-Origin': false,
  //       headers: { Authorization: `Bearer ${token}` }
  //     },}
  //   );
  //   setIsLoading(false);
  //   setFavoritesComics(response.data.comics);
  //   setFavoritesCharacters(response.data.characters);
  // };

  // const fetchDataComics = async (title) => {
  //   const response = await axios.get(
  //     `https://marvel-back-express.herokuapp.com/comics?title=${title}`,
  //     {headers: {
  //       'Access-Control-Allow-Origin': true,
  //       headers: { Authorization: `Bearer ${token}` }
  //     },}
  //   );

  //   console.log("response fetchDataComics", response);
  //   console.log("response fetchDataComics", response.data);
  //   // setComics(response.data.results);
  //   // setCountData(response.data.count);
  //   setIsLoading(false);
  //   // console.log('countData', countData);
  // };
  const fetchDataCharacters = async (id) => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/comics/${id}`,
      {headers: {
        'Access-Control-Allow-Origin': true,
        headers: { Authorization: `Bearer ${token}` }
      },}
    );

    console.log("response fetchDataComics", response);
    console.log("response fetchDataComics", response.data);
    // setComics(response.data.results);
    // setCountData(response.data.count);
    setIsLoading(false);
    // console.log('countData', countData);
  };
  useEffect(() => {
    try {
      const token = Cookies.get("marvel-user-token");
      if (token) {
        const fetchData = async () => {
          const response = await axios.get(
            `https://marvel-back-express.herokuapp.com/favorites`,
            {
              headers: {
                "Access-Control-Allow-Origin": true,
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("response", response);
          setIsLoading(false);
          setFavoritesComics(response.data.comics);
          setFavoritesCharacters(response.data.characters);
        };
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
    <Loading />
  ) : (
    <div className="page-favorites">
      <h1>Your favorites</h1>
      <h2>Comics</h2>
      {favoritesComics.map((title) => {
        console.log('title', title);
        
        {/* fetchDataComics(title); */}
        return (
          <div key={title}>
            <p>{title}</p>
          </div>
        );
      })}
      <h2>Characters</h2>
      {favoritesCharacters.map((characterId) => {
        fetchDataCharacters(characterId);
        return (
          <div key={characterId}>
            <p>{characterId}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
