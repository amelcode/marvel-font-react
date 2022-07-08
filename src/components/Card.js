import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./card.css";
import imageAvailable from "../asset/images/image_not_available.png";
const Card = ({
  id,
  name,
  description,
  imageLink,
  imageExtension,
  setFavoritesComics,
  nameElement,
  dataElement,
}) => {
  //Pour mettre que l'élément est en favorie et qu'il ne puisse plus l'etre mais implique de récupérer les données de bdd et de les mettre dans le state de l'app pour ensuite a l'affichage indiquer ceux qui sont en fav et ceux qui ne le sont pas

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesMessage, setFavoritesMessage] = useState("");
  const tokenExists = Cookies.get("marvel-user-token")
    ? Cookies.get("marvel-user-token")
    : false;

  const regiterFavorites = async (token, favorites) => {
    console.log("favorites", favorites);
    const response = await axios.put(
      `https://marvel-back-express.herokuapp.com/addFavorit`,
      {
        token: token,
        categories: nameElement,
        data: favorites,
      }
    );
    console.log("response card", response);
    setIsFavorite(true);
    setFavoritesMessage(response.data.message);
    console.log("favorites", favorites);
  };

  return (
    <div className="card" key={id}>
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

      <div className="card-description">
        <p>{description}</p>
      </div>
      <div
        className={
          tokenExists ? "card-title" : "card-title, card-title-no-token"
        }
      >
        <h2>{name}</h2>
      </div>

      <button
        className={tokenExists ? "card-favorites" : "card-favorites-disabled"}
        onClick={(e) => {
          e.preventDefault();
          console.log("click");
          // setFavoritesComics(dataElement);
          regiterFavorites(tokenExists, dataElement);
          console.log("tokenExists", tokenExists);
        }}
      >
        {isFavorite ? "favoritesMessage" : "Add Favorite"}
      </button>
      <div className="card-favorites-message"></div>
    </div>
  );
};

export default Card;
