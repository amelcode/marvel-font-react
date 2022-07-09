import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./card.css";
import imageAvailable from "../asset/images/image_not_available.png";

// userFavorites={userFavorites} setUserFavorites={setUserFavorites}

const Card = ({
  token,
  userFavorites,
  setUserFavorites,
  id,
  name,
  description,
  imageLink,
  imageExtension,
  nameElement,
  dataElement,
  isFavorite,
  setIsFavorite,
}) => {
  //Pour mettre que l'élément est en favorie et qu'il ne puisse plus l'etre mais implique de récupérer les données de bdd et de les mettre dans le state de l'app pour ensuite a l'affichage indiquer ceux qui sont en fav et ceux qui ne le sont pas

  // const [isFavorite, setIsFavorite] = useState(false);
  const tokenExists = token ? token : false;

  const regiterFavorites = async (token, favorites) => {
    try {
      if (userFavorites[nameElement].length === 0) {
        userFavorites[nameElement].push(favorites);
      } else if (userFavorites[nameElement].length !== 0) {
        let existInFav = false;
        userFavorites[nameElement].map((item, index) => {
          if (item._id === favorites._id) {
            existInFav = index;
          }
        });

        if (existInFav) {
          console.log(existInFav);
          delete userFavorites[nameElement][existInFav];
          const response = await axios.put(
            `https://marvel-back-express.herokuapp.com/addFavorit`,
            {
              token: token,
              categories: nameElement,
              data: userFavorites[nameElement],
            }
          );
          setUserFavorites(response.data);
          console.log("response card", response);
          setIsFavorite(false);
        }
        if (!existInFav) {
          userFavorites[nameElement].push(favorites);
          console.log("userFavorites", userFavorites);
          const response = await axios.put(
            `https://marvel-back-express.herokuapp.com/addFavorit`,
            {
              token: token,
              categories: nameElement,
              data: favorites,
            }
          );

          // Cookies.set("marvel-user-data", response.data);
          setUserFavorites(response.data);
          console.log("response card", response);
          setIsFavorite(true);
          // setIsFavorite(!isFavorite);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card" key={id}>
      <div className={tokenExists ? "heart" : "heart-disabled"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
          onClick={(e) => {
            e.preventDefault();
            console.log("click");
            regiterFavorites(tokenExists, dataElement);
          }}
        >
          <path
            fill={isFavorite ? "#D43D28" : "#888888"}
            d="M236 92c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a8.1 8.1 0 0 1-7.8 0C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36Z"
          ></path>
        </svg>
      </div>
      <img
        src={
          imageLink.includes("image_not_available") ||
          imageLink ===
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
            ? imageAvailable
            : `${imageLink}/portrait_uncanny.${imageExtension}`
        }
        alt={name}
      />
      <div className="card-description"></div>
      <div className="card-title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Card;
