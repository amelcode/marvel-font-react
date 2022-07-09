import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import Card from "../components/Card";

const Favorites = ({ token, userFavorites, setUserFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [noFavorite, setNoFavorite] = useState(false);
  const [favoritesComics, setFavoritesComics] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState(null);

  useEffect(() => {
    try {
      // const token = Cookies.get("marvel-user-data");
      setNoFavorite(false);

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

          console.log("response fAV", response.data);
          console.log("response.data.comics", response.data.comics);
          console.log("response.data.characters", response.data.characters);
          if (response.data.error) {
            setNoFavorite(true);
          } else {
            setFavoritesComics(response.data.comics);
            setFavoritesCharacters(response.data.characters);
          }
          setIsLoading(false);
          console.log("favoritesCharacters", favoritesCharacters);

          console.log("favoritesComics", favoritesComics);
        };
        fetchData();
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
  ) : noFavorite ? (
    <h1>No favorites</h1>
  ) : (
    <div className="page-favorites">
      <h1>Your favorites</h1>
      <h2>Comics</h2>
      <div className="containe-card">
        {favoritesComics.map((comic) => {
          return (
            <div key={comic.id}>
              <Card
                key={comic._id}
                id={comic._id}
                nameElement="comic"
                name={comic.title}
                imageLink={comic.thumbnail.path}
                imageExtension={comic.thumbnail.extension}
                dataCara={comic}
              />
            </div>
          );
        })}
      </div>
      <h2>Characters</h2>
      <div className="containe-card">
        {favoritesCharacters.map((character) => {
          return (
            <div key={character.id}>
              <Link to={`/character/${character._id}`}>
                <Card
                  key={character._id}
                  id={character._id}
                  nameElement="character"
                  name={character.name}
                  imageLink={character.thumbnail.path}
                  imageExtension={character.thumbnail.extension}
                  dataCara={character}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;

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

// const fetchDataCharacters = async (id) => {
//   const response = await axios.get(
//     `https://marvel-back-express.herokuapp.com/comics/${id}`,
//     {
//       headers: {
//         "Access-Control-Allow-Origin": true,
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     }
//   );

//   console.log("response fetchDataComics", response);
//   console.log("response fetchDataComics", response.data);
//   // setComics(response.data.results);
//   // setCountData(response.data.count);
//   setIsLoading(false);
//   // console.log('countData', countData);
// };
