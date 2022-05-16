import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import imageAvailable from "../asset/images/image_not_available.png";

const Character = () => {
  const { characterId } = useParams();
  console.log("characterId", characterId);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacter, setDataCharacter] = useState(null);
  const [dataComics, setDataComics] = useState(null);

  const divRef = useRef();

  const fetchDataComics = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/comics/${characterId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    console.log("response fetchDataComics", response);
    console.log("response.data", response.data);
    setDataCharacter(response.data);
    setDataComics(response.data.comics);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      fetchDataComics();
      divRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <div ref={divRef}>
      <Loading />
    </div>
  ) : (
    <>
      <div className="page-character">
        <h1>{dataCharacter.name}</h1>

        <img
          src={
            dataCharacter.thumbnail.path.includes("image_not_available") ||
            dataCharacter.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
              ? imageAvailable
              : `${dataCharacter.thumbnail.path}/portrait_uncanny.${dataCharacter.thumbnail.extension}`
          }
          alt={dataCharacter.name}
        />
        <p>{dataCharacter.description ? dataCharacter.description : "no description"}</p>
      </div>
      <div className="characterAppears">
      <h2>Comics where character appears</h2>
      <div>
      {dataComics.map((comic) => {
        console.log("comic", comic);

        return (
          <div key={comic._id} className="comicWereCharacterAppears card">
            <h2>{comic.title}</h2>

            <img
          src={
            comic.thumbnail.path.includes("image_not_available") ||
            comic.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
              ? imageAvailable
              : `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
          }
          alt={comic.title}
        />
          </div>
        );
      })}
      </div></div>
    </>
  );
};
export default Character;
